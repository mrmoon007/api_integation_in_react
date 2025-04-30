import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Exam() {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get('/exams').then(res => setExams(res.data));
    // }, []);

    return (
        <div>
            {
                <div style={{ border: '1px solid', padding: '10px', margin: '10px' }}>
                    Exam 1
                </div>
                // <div key={exam.id} onClick={() => navigate(`/exam/${exam.id}`)} style={{ border: '1px solid', padding: '10px', margin: '10px' }}>
                //   {exam.title}
                // </div>
            }
        </div>
    );
}
