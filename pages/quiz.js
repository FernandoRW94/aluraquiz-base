import React from 'react';

import db from '../db.json';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                [Desafio do Loading]
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({
    question, totalQuestions, questionIndex, onSubmit,
}) {
    const questionId = `question_${questionIndex}`;
    return (
        <Widget>
            <Widget.Header>
                <h3>
                    Pergunta
                    {questionIndex + 1}
                    {' '}
                    de
                    {totalQuestions}
                </h3>
            </Widget.Header>

            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />

            <Widget.Content>
                <h2>{question.title}</h2>

                <p>{question.description}</p>

                <form
                    onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();
                        onSubmit();
                    }}
                >
                    {question.alternatives.map((alternative, index) => {
                        const alternativeId = `alternative_${index}`;
                        return (
                            <Widget.Topic htmlFor={alternativeId} as="label">
                                <input
                                    id={alternativeId}
                                    type="radio"
                                    name={questionId}
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}

                    {/* <pre>{JSON.stringify(question.alternatives, null, 4)}</pre> */}

                    <Button type="submit">Confirmar</Button>
                </form>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const totalQuestions = db.questions.length;
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const question = db.questions[questionIndex];

    // Effects:
    // didMount
    // willUpdate
    // willUnmount
    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1000);
        // didMount
    }, []);

    function handleQuestionSubmit() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion >= totalQuestions) {
            setScreenState(screenStates.RESULT);
        } else {
            setQuestionIndex(nextQuestion);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />

                {screenState === screenStates.QUIZ && (
                    <QuestionWidget
                        question={question}
                        totalQuestions={totalQuestions}
                        questionIndex={questionIndex}
                        onSubmit={handleQuestionSubmit}
                    />
                )}

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && (
                    <div>
                        Você acertou X questões. Noob.
                    </div>
                )}
            </QuizContainer>
        </QuizBackground>
    );
}
