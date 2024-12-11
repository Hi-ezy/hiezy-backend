const { v4: uuidv4 } = require('uuid');
const InterviewDetails = require("../../models/interviewDetails");

const createInterviewDetail = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const jobID = req.body.jobId
        const randomString = uuidv4().split('-').join(''); // Generate a random string
        const timestamp = Date.now();
        const sessionID = timestamp
        const uniqueCode = `${timestamp}-${randomString}`;
        const newInterviewData = new InterviewDetails({
            jobID:jobID,
            email: userEmail,
            sessionID:sessionID,
            uniqueRandomCode: uniqueCode
        });
        const interviewDetails = await newInterviewData.save();
        // const query = 'INSERT INTO interviewDetails (email, uniqueCode) VALUES (?, ?)';
        // await db.execute(query, [userEmail, uniqueCode]);


        res.status(201).json({ message: 'Interview detail created successfully', interviewDetails });
    } catch (error) {
        res.status(500).json({ message: 'Error creating interview detail', error });
    }
};

module.exports = { createInterviewDetail };