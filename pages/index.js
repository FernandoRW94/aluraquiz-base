import React from 'react';
import db from '../db.json';

import MainQuizComponent from '../src/components/MainQuizComponent';

export default function Home({ setTheme }) {
    React.useEffect(() => {
        setTheme(db.theme);
    }, []);

    return (
        <MainQuizComponent db={db} externalUrl={undefined} />
    );
}
