import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function ExternalQuizPage({ externalDb }) {
    return (
        <ThemeProvider theme={externalDb.theme}>
            <QuizScreen
                externalQuestions={externalDb.questions}
                externalBg={externalDb.bg}
                externalTitle={externalDb.title}
            />
        </ThemeProvider>
    );
}

export async function getServerSideProps(context) {
    const [projectName, githubUser] = context.query.id.split('___');

    const externalUrl = `https://${projectName}.${githubUser}.vercel.app/api/db`;
    const externalDb = await fetch(externalUrl).then((response) => {
        if (response.ok) {
            return response.json();
        }

        throw new Error(`Something went wrong retrieve external data from ${externalUrl}`);
    }).then((jsonResponse) => jsonResponse).catch((error) => {
        console.log(error);
        throw error;
    });

    return {
        props: {
            externalDb,
        },
    };
}
