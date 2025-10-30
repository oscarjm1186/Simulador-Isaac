
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Question } from "../types";

const optionLabels = ['A', 'B', 'C', 'D'];

function getOptionText(question: Question, label: string): string {
    const index = optionLabels.indexOf(label);
    if (index === -1 || index >= question.options.length) {
        return "Opción inválida";
    }
    return question.options[index];
}

export const fetchExplanation = async (question: Question, userAnswerLabel?: string): Promise<string> => {
  // Assume API_KEY is set in the environment
  if (!process.env.API_KEY) {
    // In a real app, you'd handle this more gracefully.
    // For this environment, we can return a mock explanation.
    console.warn("API_KEY is not set. Returning mock explanation.");
    return new Promise(resolve => setTimeout(() => resolve("This is a mock explanation because the Gemini API key is not configured in this environment."), 500));
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const correctAnswerText = getOptionText(question, question.correctAnswer);
  let userAnswerText = 'El usuario no respondió.';
  if (userAnswerLabel) {
      userAnswerText = getOptionText(question, userAnswerLabel);
  }

  const isCorrect = userAnswerLabel === question.correctAnswer;

  const prompt = `
    Contexto: Soy un estudiante preparándome para un examen de administración de empresas.
    Pregunta del examen: "${question.question}"

    Opciones:
    ${question.options.map((opt, i) => `${optionLabels[i]}) ${opt}`).join('\n')}

    La respuesta correcta es la opción ${question.correctAnswer}: "${correctAnswerText}".
    Mi respuesta fue la opción ${userAnswerLabel || 'ninguna'}: "${userAnswerText}".

    Tarea:
    1. Explica de forma concisa y clara por qué la opción ${question.correctAnswer} es la respuesta correcta.
    ${!isCorrect && userAnswerLabel ? `2. Explica brevemente por qué mi respuesta, la opción ${userAnswerLabel}, es incorrecta.` : ''}
    
    Por favor, sé directo y mantén la explicación enfocada en los conceptos de administración relevantes. No uses markdown.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching explanation from Gemini:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
