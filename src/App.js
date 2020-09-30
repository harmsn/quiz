import React, {useReducer, useEffect} from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';
import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
} from './reducers/types.js';
import quizReducer from './reducers/QuizReducer';

import './App.css';

function App() {
    const questions = [
        {
            id: 1,
            question: 'Which sfvnfjnvj',
            answer_a:
                'Hooks are 100% backwards-compatible and can be used side by side with classes',
            answer_b: 'Hooks are still in beta and not available yet',
            answer_c:
                "Hooks are completely opt-in, there's no need to rewrite existing code",
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 2,
            question: 'Which femd vdjv djncdjncjd?',
            answer_a: 'ujdnj()',
            answer_b: 'usdjmdjnst()',
            answer_c: 'djvnjdncer()',
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 3,
            question: 'What kedvvnd djvndjvndj?',
            answer_a: 'uddseDatjdvjd',
            answer_b: 'usevdvdpidcdc',
            answer_c: 'dvdvdvffect',
            answer_d: 'dvdvi12equest',
            correct_answer: 'c',
        },
    ];

    const initialState = {
        questions,
        currentQuestion: 0,
        currentAnswer: '',
        answers: [],
        showResults: false,
        error: '',
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);
    const {currentQuestion, currentAnswer, answers, showResults, error} = state;

    const question = questions[currentQuestion];

    const renderError = () => {
        if (!error) {
            return;
        }
        return <div className="error"><p>{error}</p></div>;
    };

    const renderResultMark = (question, answer) => {
        if (question.correct_answer === answer.answer) {
            return <span className="correct">Correct</span>;
        }

        return <span className="failed">Failed</span>;
    };

    const renderResultsData = () => {
        return answers.map(answer => {
            const question = questions.find(
                question => question.id === answer.questionId
            );

            return (
                <div key={question.id}>
                    {question.question} - {renderResultMark(question, answer)}
                </div>
            );
        });
    };

    const restart = () => {
        dispatch({type: RESET_QUIZ});
    };

    const next = () => {
        const answer = {questionId: question.id, answer: currentAnswer};

        if (!currentAnswer) {
            dispatch({type: SET_ERROR, error: 'Please select an option'});
            return;
        }

        answers.push(answer);
        dispatch({type: SET_ANSWERS, answers});
        dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});

        if (currentQuestion + 1 < questions.length) {
            dispatch({
                type: SET_CURRENT_QUESTION,
                currentQuestion: currentQuestion + 1,
            });
            return;
        }

        dispatch({type: SET_SHOW_RESULTS, showResults: true});
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", function() {
            document.title = document.hidden ? "I'm away" : "I'm here";
            if(document.hidden)
            {
                alert("Don't switch tabs");
            }
        });
        window.onbeforeunload = function (e) {
            e = e || window.event;
        
            // For IE and Firefox prior to version 4
            if (e) {
                e.returnValue = 'Sure?';
            }
        
            // For Safari
            return 'Sure?';
        };
   //     return () => {
            //window.removeEventListener('beforeunload', setupBeforeUnloadListener());
         
    ////    }
      });
    if (showResults) {
        return (
            <div className="container results">
                <h2>Results</h2>
                <ul>{renderResultsData()}</ul>
                <button className="btn btn-primary" onClick={restart}>
                    Restart
                </button>
            </div>
        );
    } else {
        return (
            
            <QuizContext.Provider value={{state, dispatch}}>
                {alert}
                <div className="container">
                    
                    <Progress
                        total={questions.length}
                        current={currentQuestion + 1}
                    />
                    <Question />
                    {renderError()}
                    <Answers />
                    <button style={{marginTop: '20px' ,borderRadius : '4px',boxShadow : 'none'}} onClick={next}>
                        Confirm and Continue
                    </button>
                </div>
            </QuizContext.Provider>
        );
    }
}

export default App;
