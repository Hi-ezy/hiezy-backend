const { GoogleGenerativeAI } = require("@google/generative-ai");

const ConversionalLog = require("../../models/conversationModel")
const JobPost = require("../../models/jobDetails")
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getAIResponse(candidateResponse,sessionId, phase,jobId ) {
    try {
      const addToConversionLog = await createConversionLogs(sessionId, "candidate", candidateResponse);
      // console.log(addToConversionLog);
      const jobDetails = JobPost.findById({_id:jobId})
      const conversationHistory = await getConversationLog(sessionId);
      // console.log(conversationHistory)
      let prompt;
  
      if (phase === "interaction") {
        // Phase 1: Interactive conversation
        prompt = `

You are Hezal, an empathetic and professional AI interviewer for a Product Management (PM) role. Your goal is to evaluate the candidate's skills in resolving real-world product challenges through structured, strategic thinking and clear communication.

Introduction: Start by introducing yourself as Hezal and briefly explaining the job posting to set the context for the interview. Then, ask the candidate to introduce themselves.
Engagement: Begin the conversation with a generic question about the PM role to build rapport and ease into the interview. For example, "Can you share a bit about your experience as a Product Manager or similar roles?"
Interview Structure:
Transition to a product-related question based on their response.
Introduce realistic product challenges to evaluate skills like prioritization, roadmap planning, problem-solving, strategic thinking, and product sense.
Encourage the candidate to ask clarifying questions. Respond to each in two sentences or fewer, staying concise and informative.
Guide the candidate to deeply analyze and articulate their approach to solving the problem without providing direct solutions.
Conversation Flow: Limit your responses to clarifications and follow-up questions. Tailor your next questions based on the candidate's previous answers.
Context for AI:
Job Description :${jobDetails}
History of the conversation so far: ${conversationHistory}
Candidate's most recent response: "${candidateResponse}"
  `;
      } else if (phase === "feedback") {
        // Phase 2: Feedback and scoring
        prompt = `
  You are now providing feedback on the candidate's performance in a product management interview.
       history: ${conversationHistory}
  - Strengths: Highlight insightful analysis or creative solutions.
  - Weaknesses: Identify areas for improvement, e.g., lack of depth or missed key points.
  - Suggested improvements: Offer practical advice on how to improve.
  Rate the response on a scale of 1 to 10.
  
  The candidate's performance summary:
  "${candidateResponse}"
  `;
      }
  
      // Initialize the Gemini model
    
  
      // Generate a response
      const result = await model.generateContent(prompt, { maxTokens: 300 });
       await createConversionLogs(sessionId, "AI", result.response.text() )

      return result.response.text();
  
    } catch (error) {
      console.error("Error fetching AI response:", error);
      throw error;
    }
  }
  
const aiResponseGenrator = async (req, res) =>{
    try {
        const body = req.body || {};
        const prompt = body.question.trim();
        const sessionID = body.sessionId
        const phase = body.phase;
        const jobId = body.jobid
        const aiResponse = await getAIResponse(prompt,sessionID, phase);
        res.status(200).json({
            succuss:true,
            code:200,
            response: aiResponse,
            message: "AI replyed."
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

const  getConversationLog= async(sessionID) =>{
  try {
    
    return await ConversionalLog
      .find({ sessionID })
      .sort({ timestamp: 1 })
  } catch (error) {
    console.log(error)
  }
}
  const  createConversionLogs= async(sessionID, role, message) =>{
    try {
      const newConversionDialogue = new ConversionalLog({
        sessionID,
        role,
        message:message
      })
      return  await newConversionDialogue.save()
    } catch (error) {
      console.log(error)
    }
}




module.exports={aiResponseGenrator}