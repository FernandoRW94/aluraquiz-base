import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
    const router = useRouter();
    const [name, setName] = React.useState('');

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>AluraQuiz - Chess for dumbs</title>
            </Head>

            <QuizContainer>
                <QuizLogo />

                <Widget>
                    <Widget.Header>
                        <h1>Chess for Dumbs</h1>
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

                        <p>lorem ipsum dolor sit amet...</p>
                    </Widget.Content>
                </Widget>

                <Footer />
            </QuizContainer>

            <GitHubCorner projectUrl="https://github.com/FernandoRW94" />
        </QuizBackground>
    );
}
