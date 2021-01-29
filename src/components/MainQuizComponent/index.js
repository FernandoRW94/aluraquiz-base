import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Widget from '../Widget';
import QuizLogo from '../QuizLogo';
import QuizBackground from '../QuizBackground';
import Footer from '../Footer';
import GitHubCorner from '../GitHubCorner';
import Input from '../Input';
import Button from '../Button';
import QuizContainer from '../QuizContainer';

export default function MainQuizComponent({ db }) {
    const router = useRouter();
    const [name, setName] = React.useState('');

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>{db.title}</title>
            </Head>

            <QuizContainer>
                <QuizLogo />

                <Widget>
                    <Widget.Header>
                        <h1 style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                            {db.title !== 'Chess for dumbs - #AluraQuiz' && (
                                <Link href="/">
                                    <Widget.IconLink href="/">
                                        <svg
                                            version="1.1"
                                            id="Capa_1"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 55.753 55.753"
                                        >
                                            <g>
                                                <path d="M12.745,23.915c0.283-0.282,0.59-0.52,0.913-0.727L35.266,1.581c2.108-2.107,5.528-2.108,7.637,0.001
                                                    c2.109,2.108,2.109,5.527,0,7.637L24.294,27.828l18.705,18.706c2.109,2.108,2.109,5.526,0,7.637
                                                    c-1.055,1.056-2.438,1.582-3.818,1.582s-2.764-0.526-3.818-1.582L13.658,32.464c-0.323-0.207-0.632-0.445-0.913-0.727
                                                    c-1.078-1.078-1.598-2.498-1.572-3.911C11.147,26.413,11.667,24.994,12.745,23.915z"
                                                />
                                            </g>
                                        </svg>
                                    </Widget.IconLink>
                                </Link>
                            )}
                            {db.title}
                        </h1>
                    </Widget.Header>

                    <Widget.Content>
                        <form onSubmit={(infosDoEvento) => {
                            infosDoEvento.preventDefault();
                            router.push(`/quiz?name=${name}`);
                        }}
                        >
                            <Input
                                onChange={(infosDoEvento) => {
                                    setName(infosDoEvento.target.value);
                                }}
                                placeholder="name..."
                                name="nomeDoUsuario"
                                value={name}
                            />

                            <Button type="button" disabled={name.length === 0}>
                                Play
                            </Button>
                        </form>
                    </Widget.Content>
                </Widget>

                <Widget>
                    <Widget.Content>
                        <h1>Other quizzes</h1>

                        <ul>
                            {db.external.map((link, index) => {
                                const [quizName, userName] = link.replace(/(\/)|(https:)|(.vercel.app)/g, '').split('.');

                                return (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <li key={`external_quiz_${index}`}>
                                        <Link href={`/quiz/${quizName}?username=${userName}`}>
                                            <Widget.Topic href={`/quiz/${quizName}?username=${userName}`}>
                                                {`${quizName} / ${userName}`}
                                            </Widget.Topic>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </Widget.Content>
                </Widget>

                <Footer />
            </QuizContainer>

            <GitHubCorner projectUrl="https://github.com/FernandoRW94" />
        </QuizBackground>
    );
}
