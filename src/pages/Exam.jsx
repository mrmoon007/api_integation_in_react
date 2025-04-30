import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/apiService';

export default function Exam() {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await ApiService.get('exams');

            setExams(response.data.data);
        } catch (err) {
            // setError('Failed to fetch users');
        }
    };

    return (
        <div>
            {exams.map(exam => (
                <div key={exam.id} onClick={() => navigate(`/exam/${exam.id}`)} style={{ border: '1px solid', padding: '10px', margin: '10px' }}>
                    {exam.title}
                </div>
            ))}
        </div>
    );
}
