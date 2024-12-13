const { v4: uuidv4 } = require('uuid');
const InterviewDetails = require("../../models/candidatesDetails");
const EmailService = require("../commonService/email_service")
const frontEndURL = process.env.FRONTEND_URL;
const createInterviewDetail = async (req, res) => {
    try {
        const data = req.body || {};
        const candidatesList = data.candidatesList;
        for(let candidate of candidatesList){
            const randomString = uuidv4().split('-').join('')
            let candidateData = {
                jobID :candidate?.jobID,
                name: candidate?.name,
                email :candidate?.email,
                experience: candidate?.experience,
                uniqueCode : randomString,
                uniqueLink : `${frontEndURL}/candidate/interview?uniqueid=${randomString}`
            }
            const saveCandidate = await candidateData.save();
            const sendEmail = EmailService.sendEmail(candidateData)
            console.log("send Email", sendEmail)
        }

        res.status(201).json({ message: 'Interview detail created successfully', interviewDetails });
    } catch (error) {
        res.status(500).json({ message: 'Error creating interview detail', error });
    }
};

const validateCandidate = async () =>{
    const query = req.query || {};
    const uniqueID = query?.uniqueid;
    const candidate = await InterviewDetails.findOne({uniqueRandomCode:uniqueID});
    if(candidate){
        res.status(200).json({
            succuss:true,
            code:200,
            sessionId: Date.now(),
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