const { v4: uuidv4 } = require('uuid');
const InterviewDetails = require("../../models/candidatesDetails");
const EmailService = require("../commonService/email_service")
const frontEndURL = process.env.FRONTEND_URL;
const createInterviewDetail = async (req, res) => {
    try {
        const data = req.body || {};
        // console.log(data)
        const sentEmails = [];
        const candidatesList = data.candidatesList;
        for(let candidate of candidatesList){
            const randomString = uuidv4().split('-').join('')
            const uniqueLink = `${frontEndURL}/interview?uniqueid=${randomString}`
            let candidateData =new InterviewDetails( {
                jobID :candidate?.jobID,
                name: candidate?.name,
                email :candidate?.email,
                experience: candidate?.experience,
                uniqueRandomCode : randomString,
            })
            // console.log("candidateData", candidateData)
            const interviewDetails = await candidateData.save();
            // console.log("candidate save", interviewDetails)
            const sendEmail = await EmailService.sendEmail(candidate?.name, candidate?.email, uniqueLink, candidate?.experience)
            if(sendEmail){
                sentEmails.push(candidate?.email)
            }
        }
        res.status(200).json({
            succuss:true,
            code:200,
            response: sentEmails,
            message: "Interview details saved succussfully."
        })
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating interview detail', error });
    }
};

const validateCandidate = async (req, res) =>{
    const query = req.query || {};
    const uniqueID = query?.uniqueid;
    const candidate = await InterviewDetails.findOne({uniqueRandomCode:uniqueID});
    // console.log(candidate)
    if(candidate){
        res.status(200).json({
            succuss:true,
            code:200,
            data: candidate,
            message: "Candidate Validate Succussfully."
        })
    } else{
        res.status(400).json({
            succuss:true,
            code:400,
            message: "This is not valid link. please contact with HR."
        })
    }
}

module.exports = { createInterviewDetail, validateCandidate };