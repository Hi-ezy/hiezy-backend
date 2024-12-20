const { GoogleGenerativeAI } = require("@google/generative-ai");
const JobPost = require("../../models/jobDetails")
const multer = require('multer');
const axios = require("axios");
const pdfParse = require('pdf-parse');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const InterviewDetails = require("../../models/candidatesDetails");
const EmailService = require("../commonService/email_service")
const frontEndURL = process.env.FRONTEND_URL;
// const jobDetails = require("../../models/jobDetails");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pdf_uploads', // Folder name in Cloudinary
    resource_type: 'raw', // IMPORTANT: Set resource_type to 'raw' for non-media files
    allowed_formats: ['pdf'], // Allow only PDF files
  },
});

const upload = multer({ storage });

  const uploadResume = async (req, res) => {
    try {
      const file = req.file || {};
      const body = req.body || {};
      const jobId = body.jobId;
  
      // Step 1: Fetch Job Details
      const jobDetails = await JobPost.findById({ _id: jobId });
      if (!jobDetails) {
        throw new Error('Job details not found.');
      }
  
      // Step 2: Download the File from Cloudinary
      const resumeUrl = file.path; // Cloudinary URL
      const response = await axios.get(resumeUrl, { responseType: 'arraybuffer' }); // Download as binary data
      const fileBuffer = Buffer.from(response.data);
  
      // Step 3: Parse the PDF
      const parsedPDF = await pdfParse(fileBuffer);
      const resumeText = parsedPDF.text;
  
      // Step 4: Send the Resume and Job Description to the AI Model
      const input_prompt1 = `
       You are an expert in analyzing resumes and job descriptions. Compare the following resume and job description. Based on skills, experience, and qualifications, provide a percentage match between the two.
       Respond with only the percentage match (e.g., "75%").
        `;
      
  
      // Step 5: Call Gemini AI
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(`${input_prompt1}\n\nJob Description:\n${JSON.stringify(jobDetails)}\n\nResume Content:\n${JSON.stringify(resumeText)}`,);
  
      // Log the full API response for debugging
      
  
      // Step 6: Extract Match Percentage
      const matchPercentage = result.response.text() || 'Unable to calculate match'; // Adjust based on actual response structure
        if(parseInt(matchPercentage > 60)){
          const randomString = uuidv4().split('-').join('')
          const uniqueLink = `${frontEndURL}/interview?uniqueid=${randomString}`
          let candidateData =new InterviewDetails( {
              jobID :jobId,
              name: body?.name,
              email :body?.email,
              uniqueRandomCode : randomString,
          })
          console.log("candidateData", candidateData)
          const interviewDetails = await candidateData.save();
          // console.log("candidate save", interviewDetails)
          const sendEmail = await EmailService.sendEmail(body?.name, body?.email, uniqueLink)
         console.log(sendEmail)
        }
      // Step 7: Send the Success Response
      res.status(200).json({
        success: true,
        code: 200,
        response: matchPercentage,
        message: 'Resume uploaded successfully.',
      });
    } catch (error) {
      // Handle Errors
      console.error("Error:", error.message || error);
      res.status(400).json({
        success: false,
        code: 400,
        error: error.message || error.toString(),
        message: 'Something went wrong',
      });
    }
  };
  
module.exports={uploadResume, upload}