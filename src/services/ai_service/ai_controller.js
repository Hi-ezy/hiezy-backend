const { GoogleGenerativeAI } = require("@google/generative-ai");

const ConversionalLog = require("../../models/conversationModel")
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getAIResponse(candidateResponse,sessionId, phase ) {
    try {
      const addToConversionLog = await createConversionLogs(sessionId, "candidate", candidateResponse);
      // console.log(addToConversionLog);

      const conversationHistory = await getConversationLog(sessionId);
      // console.log(conversationHistory)
      let prompt;
  
      if (phase === "interaction") {
        // Phase 1: Interactive conversation
        prompt = `
  You are an empathetic and professional interviewer conducting a product management interview. Your goal is to evaluate the candidate's ability to resolve real-world product problems.
  
  - Start by providing a realistic product-related problem (if not already started).
  - Encourage clarifying questions and respond in **two sentences or fewer**.
  - Guide the candidate to analyze the problem deeply without giving away solutions.
  
  Limit your answers to clarifications only and ask furthure questions related to answer.
  
  History of conversation so for: ${conversationHistory}
  new candidate response: "${candidateResponse}"
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
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
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