import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../services/apiService';

export default function ExamForm() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await ApiService.get(`/exams/${id}`);
        setExam(response.data.data);
      } catch (error) {
        console.error('Error fetching exam:', error);
      }
    };

    fetchExam();
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [id]);

  const handleChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = {
        answers: answers
      };
      
      const response = await ApiService.post(`/exams/${id}/submit`, formattedAnswers);
      setResult(response.data.data); // Changed to access data.data instead of data.result
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  if (result) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Result</h2>
        <div className="mb-6 p-4 bg-green-50 rounded">
          <p className="text-lg">Score: {result.score} out of {result.total_questions}</p>
          <p className="text-lg">Correct Answers: {result.correct_answers}</p>
        </div>
        {result.results.map((r, i) => (
          <div key={i} className="mb-4 p-4 border rounded">
            <p><strong>Question:</strong> {r.question}</p>
            <p><strong>Your Answer:</strong> {r.your_answer}</p>
            <p><strong>Correct Answer:</strong> {r.correct_answer}</p>
            <p className={r.is_correct ? 'text-green-600' : 'text-red-600'}>
              {r.is_correct ? '✔️ Correct' : '❌ Wrong'}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft <= 0) {
    handleSubmit(); // Auto-submit when time runs out
    return <div>Time's up! Your answers have been submitted.</div>;
  }

  if (result) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Result</h2>
        {result.map((r, i) => (
          <div key={i} className="mb-4 p-4 border rounded">
            <p><strong>Question:</strong> {r.question}</p>
            <p><strong>Your Answer:</strong> {r.your_answer}</p>
            <p><strong>Correct Answer:</strong> {r.correct_answer}</p>
            <p className={r.is_correct ? 'text-green-600' : 'text-red-600'}>
              {r.is_correct ? '✔️ Correct' : '❌ Wrong'}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (!exam) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{exam.title}</h2>
      <div className="fixed top-4 right-4 bg-green-100 p-2 rounded">
        Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </div>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }} className="space-y-6">
        {exam.questions.map(q => (
          <div key={q.id} className="p-4 border rounded">
            <p className="font-semibold mb-3">{q.question_text}</p>
            {q.type === 'mcq' ? (
              <div className="space-y-2">
                {q.options.map(opt => (
                  <label key={opt.id} className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name={`q-${q.id}`} 
                      value={opt.option_text}
                      onChange={() => handleChange(q.id, opt.option_text)}
                      className="form-radio"
                    />
                    <span>{opt.option_text}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input 
                type="text" 
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        ))}
        <button 
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Submit Exam
        </button>
      </form>
    </div>
  );
}
