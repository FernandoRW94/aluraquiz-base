import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Lottie } from '@crello/react-lottie';

import loadingAnimation from '../../animations/loading.json';

import QuizContainer from '../../components/QuizContainer';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';

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
                <p>{`You've got ${correctResults} question${(correctResults > 1 ? 's' : '')} right`}</p>

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

            <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
                <Lottie
                    width="200px"
                    height="200px"
                    className="lottie-container basic"
                    config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
                />
            </Widget.Content>
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
                            setIsQuestionSubmitted(false);
                            setSelectedAlternative(undefined);
                            onSubmit();
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

                    <Button type="submit" disabled={!hasSelectedAlternative}>Confirm</Button>

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

export default function QuizPage({ externalQuestions, externalBg, externalTitle }) {
    const router = useRouter();
    const username = router.query.name;
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = externalQuestions.length;
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const question = externalQuestions[questionIndex];
    const bg = externalBg;

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
        <QuizBackground backgroundImage={bg}>
            <Head>
                <title>{externalTitle}</title>
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
