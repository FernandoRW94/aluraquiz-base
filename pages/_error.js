import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';

function Error({ statusCode, setTheme }) {
    React.useEffect(() => {
        setTheme(db.theme);
    }, []);

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>Error</title>
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
                            Oops. Something went wrong.
                        </h1>
                    </Widget.Header>
                </Widget>

                <Footer />
            </QuizContainer>

            <GitHubCorner projectUrl="https://github.com/FernandoRW94" />
        </QuizBackground>
    );
}

Error.getInitialProps = ({ res, err }) => {
    // eslint-disable-next-line no-nested-ternary
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
