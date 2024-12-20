const { GoogleGenerativeAI } = require("@google/generative-ai");
const JobPost = require("../../models/jobDetails")
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const createJob = async (req, res)=>{
    try {
        const data = req.body || {};
        const newJob = new JobPost({
            company: data.company,
          jobTitle : data.jobTitle,
          skills: data.skills,
          qualification : data.qualification,
          experience: data.experience,
            salary : data.salary,
            location: data.location,
          jobDescription: data.description
        });
        const jobCreation = await newJob.save();
        res.status(200).json({
          succuss:true,
          code:200,
          response: jobCreation,
          message: "Job Created Succussfully"
        })
    } catch (error) {
        res.status(400).json({
            succuss:false,
            code:400,
            err: error,
            message: error.toString() || "Something went wrong"
        })
    }
   
    }

    const getAllJob = async(req,res) =>{
        try {
            const query = req.query || {}
            const allJobs =await JobPost.find({}).limit(query?.limit||10).skip(query?.skip|| 0).exec();
            res.status(200).json({
                succuss:true,
                code:200,
                response: allJobs,
                message: "Job fetched Succussfully"
              })

        } catch (error) {
            res.status(400).json({
                succuss:false,
                code:400,
                err: error,
                message: error.toString() || "Something went wrong"
            })
        }
       
    }
    const getAllJobBYCompany = async(req,res) =>{
        try {
            const query = req.query || {}
            const allJobs =await JobPost.find({company:query?.company}).limit(query?.limit||10).skip(query?.skip|| 0).exec();
            res.status(200).json({
                succuss:true,
                code:200,
                response: allJobs,
                message: "Job fetched Succussfully"
              })

        } catch (error) {
            res.status(400).json({
                succuss:false,
                code:400,
                err: error, 
                message: error.toString() || "Something went wrong"
            })
        }
       
    }
    const getJobById = async(req,res) =>{
        try {
            const query = req.query || {}
            const getspecificJobs =await JobPost.find({_id:query?.id}).exec();
            res.status(200).json({
                succuss:true,
                code:200,
                response: getspecificJobs,
                message: "Job by Id fetched Succussfully"
              })

        } catch (error) {
            res.status(400).json({
                succuss:false,
                code:400,
                err: error, 
                message: error.toString() || "Something went wrong"
            })
        }
       
    }

    const createAIJD = async (req, res)=>{
        const data = req.body || {};
        console.log("data", data)
        const jdprompt = `create a job description for a ${data.jobTitle} role in the ${data.department} department and the location will be ${data.location}. The ideal candidate will have [${data.skills} ] ,${data.qualification} as qualification and ${data.experience}  of experience. The role requires the candidate to perform ${data.responsibilities}. Please write the job description in a professional tone and ensure it includes a summary, responsibilities, required qualifications, and optional preferred qualifications. limit the response to 10 lines`
        
        const jd = await model.generateContent(jdprompt, { maxTokens: 300 });
        res.status(200).json({
            succuss:true,
            code:200,
            response: jd.response.text(),
            message: "Job description created Succussfully"
          })
    }

    module.exports = {jdCreator: createJob, createAIJD, getAllJob, getAllJobBYCompany,getJobById}