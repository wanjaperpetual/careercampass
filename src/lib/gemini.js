import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Initialize Gemini client with API key from environment variables
 */
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Generate text response from Gemini
 * @param {string} prompt - The user's input prompt
 * @returns {Promise<string>} The generated text
 */
export async function generateText(prompt) {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in text generation:', error);
    throw error;
  }
}

/**
 * Stream text responses in real-time
 * @param {string} prompt - The user's input prompt  
 * @param {Function} onChunk - Callback to handle each streamed chunk
 */
export async function streamText(prompt, onChunk) {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error('Error in streaming text generation:', error);
    throw error;
  }
}

/**
 * Generate career recommendations based on user profile
 * @param {object} userProfile - User's interests, subjects, and strengths
 * @returns {Promise<string>} Career recommendations
 */
export async function generateCareerRecommendations(userProfile) {
  const { interests, subjects, strengths } = userProfile;
  
  const prompt = `As a career guidance expert in Kenya, provide personalized career recommendations for a high school student with the following profile:

Interests: ${interests?.join(', ') || 'Not specified'}
Favorite Subjects: ${subjects?.join(', ') || 'Not specified'}  
Strengths: ${strengths?.join(', ') || 'Not specified'}

Please provide:
1. Top 5 career recommendations that match this profile
2. For each career, include:
   - Brief description (2-3 sentences)
   - Required education level 
   - Estimated salary range in Kenya (KES)
   - Job outlook in Kenya
   - Key skills needed
   - Relevant universities/institutions in Kenya

Focus on careers that are viable and in-demand in the Kenyan job market. Format the response in a clear, structured way that's easy for a high school student to understand.`;

  return generateText(prompt);
}

/**
 * Generate career guidance chat response
 * @param {string} userMessage - User's question or message
 * @param {Array} conversationHistory - Previous conversation context
 * @returns {Promise<string>} AI response
 */
export async function generateCareerChatResponse(userMessage, conversationHistory = []) {
  const contextPrompt = conversationHistory.length > 0 
    ? `Previous conversation context:\n${conversationHistory.slice(-5).map(msg => 
        `${msg.isUser ? 'Student' : 'Coach'}: ${msg.text}`
      ).join('\n')}\n\n`
    : '';

  const prompt = `${contextPrompt}You are an AI career coach specializing in guidance for Kenyan high school students and early-stage learners. You have expertise in:
- Kenyan education system and university programs
- Local job market trends and opportunities  
- Career paths suitable for different interests and skills
- University admission requirements and processes
- Skills development and career preparation

Current student question: "${userMessage}"

Provide helpful, encouraging, and practical advice. Keep responses conversational, supportive, and focused on actionable guidance. Include specific examples relevant to Kenya when possible. If discussing universities or careers, mention real institutions and realistic salary ranges in Kenyan Shillings (KES).

Limit response to 2-3 paragraphs for readability.`;

  return generateText(prompt);
}

/**
 * Find universities based on career selection
 * @param {string} careerField - Selected career field
 * @returns {Promise<string>} University recommendations
 */
export async function findUniversitiesForCareer(careerField) {
  const prompt = `As a university guidance counselor in Kenya, recommend universities and programs for someone interested in ${careerField}.

Please provide:
1. Top 5 universities in Kenya offering relevant programs
2. For each university, include:
   - Full university name
   - Specific program/degree name
   - Location  
   - Approximate annual fees (in KES)
   - Minimum cluster points/entry requirements
   - Program duration
   - Whether it's public or private
   - Key advantages of the program

Focus on accredited institutions with good reputations. Include both public and private options. Mention any special requirements, internship opportunities, or unique features of the programs.

Format the information clearly for easy comparison.`;

  return generateText(prompt);
}

/**
 * Analyze user responses and generate career matches
 * @param {object} assessmentData - User's assessment responses
 * @returns {Promise<Array>} Career match objects
 */
export async function analyzeCareerMatches(assessmentData) {
  const { interests, subjects, strengths } = assessmentData;
  
  const prompt = `Analyze this student profile and provide exactly 6 career recommendations with match percentages:

Interests: ${interests?.join(', ') || 'Not specified'}
Strong Subjects: ${subjects?.join(', ') || 'Not specified'}
Key Strengths: ${strengths?.join(', ') || 'Not specified'}

For each career recommendation, provide a JSON object with these exact fields:
- id: unique number
- title: career name
- description: 2-3 sentence description
- matchPercentage: percentage (60-95)
- icon: one of [Briefcase, Code, Stethoscope, Scale, Hammer, Palette, Users, Calculator, Globe, BookOpen]
- educationLevel: "Certificate", "Diploma", "Degree", or "Postgraduate"
- salaryRange: {min: amount in KES, max: amount in KES}
- location: "Nairobi", "Mombasa", "Kisumu", or "Nationwide"

Respond ONLY with a valid JSON array of 6 career objects, no additional text.`;

  try {
    const response = await generateText(prompt);
    // Clean the response and parse JSON
    const cleanResponse = response.replace(/```json\n?|```\n?/g, '').trim();
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error('Error parsing career matches:', error);
    // Return fallback data if parsing fails
    return [];
  }
}

export default genAI;