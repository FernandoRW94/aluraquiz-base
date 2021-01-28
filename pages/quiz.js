import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import db from '../db.json';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import AlternativesForm from '../src/components/AlternativesForm';

function ResultWidget({ results, userName }) {
    const correctResults = results.reduce((currentSum, currentResult) => {
        const isCorrect = currentResult === true;
        return currentSum + (isCorrect ? 1 : 0);
    }, 0);
    const router = useRouter();

    return (
        <Widget>
            <Widget.Header>
                {`That is it ${userName}!!`}
            </Widget.Header>

            <Widget.Content>
                <p>{`You've got ${correctResults} question${(correctResults > 1 ? '\'s' : '')} right`}</p>

                <ul>
                    {results.map((result, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={`answer_result_item_${index}`}>
                            {`#${index + 1} question: ${result === true ? 'correct' : 'wrong'}`}
                        </li>
                    ))}
                </ul>

                <Button
                    type="button"
                    onClick={() => {
                        router.push('/');
                    }}
                >
                    Exit
                </Button>
            </Widget.Content>
        </Widget>
    );
}

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Loading...
            </Widget.Header>

            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src="https://media.giphy.com/media/S8a4hB7rZWQfbfUjDE/giphy.gif"
            />
        </Widget>
    );
}

function QuestionWidget({
    question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);
    const questionId = `question_${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasSelectedAlternative = selectedAlternative !== undefined;

    return (
        <Widget>
            <Widget.Header>
                <h3>
                    {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
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

                <AlternativesForm
                    onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();
                        setIsQuestionSubmitted(true);

                        setTimeout(() => {
                            addResult(isCorrect);
                            onSubmit();
                            setIsQuestionSubmitted(false);
                            setSelectedAlternative(undefined);
                        }, 3000);
                    }}
                >
                    {question.alternatives.map((alternative, index) => {
                        const alternativeId = `alternative_${index}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlternative === index;

                        return (
                            <Widget.Topic
                                htmlFor={alternativeId}
                                as="label"
                                key={alternativeId}
                                data-selected={isSelected}
                                data-status={isQuestionSubmitted && alternativeStatus}
                            >
                                <input
                                    style={{ display: 'none' }}
                                    id={alternativeId}
                                    type="radio"
                                    name={questionId}
                                    onChange={() => setSelectedAlternative(index)}
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}

                    {/* <pre>{JSON.stringify(question.alternatives, null, 4)}</pre> */}

                    <Button type="submit" disabled={!hasSelectedAlternative}>Confirmar</Button>

                    {isQuestionSubmitted && isCorrect && <p>Correct!!</p>}
                    {isQuestionSubmitted && !isCorrect && <p>Nop, that is wrong.</p>}
                </AlternativesForm>
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
    const router = useRouter();
    const username = router.query.name;
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = db.questions.length;
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const question = db.questions[questionIndex];

    function addResult(newResult) {
        setResults([
            ...results,
            newResult,
        ]);
    }

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
        setScreenState(screenStates.LOADING);
        setTimeout(() => {
            if (nextQuestion >= totalQuestions) {
                setScreenState(screenStates.RESULT);
            } else {
                setQuestionIndex(nextQuestion);
                setScreenState(screenStates.QUIZ);
            }
        }, 500);
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>AluraQuiz - Chess for dumbs</title>
            </Head>

            <QuizContainer>
                <QuizLogo />

                {screenState === screenStates.QUIZ && (
                    <QuestionWidget
                        question={question}
                        totalQuestions={totalQuestions}
                        questionIndex={questionIndex}
                        onSubmit={handleQuestionSubmit}
                        addResult={addResult}
                    />
                )}

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && <ResultWidget results={results} userName={username} />}
            </QuizContainer>
        </QuizBackground>
    );
}
