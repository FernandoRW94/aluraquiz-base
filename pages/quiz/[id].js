import React from 'react';
import MainQuizComponent from '../../src/components/MainQuizComponent';

export default function ExternalQuizPage({ externalDb, setTheme }) {
    React.useEffect(() => {
        setTheme(externalDb.theme);
    }, []);

    return (
        <MainQuizComponent db={externalDb} />
    );
}

export async function getServerSideProps(context) {
    const externalUrl = `https://${context.query.id}.${context.query.username}.vercel.app/api/db`;
    const externalDb = await fetch(externalUrl).then((response) => {
        if (response.ok) {
            return response.json();
        }

        throw new Error(`Something went wrong retrieve external data from ${externalUrl}`);
    }).then((jsonResponse) => jsonResponse).catch((error) => {
        console.log(error);
    });

    return {
        props: {
            externalDb,
        },
    };
}
