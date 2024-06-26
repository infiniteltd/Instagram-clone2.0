"use client";

import { faker } from '@faker-js/faker';
import { useEffect, useState } from "react";
import Story from './Story';
import { useSession } from 'next-auth/react';

function Stories() {
    const [suggestions, setSuggestions] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const suggestions = [...Array(25)].map((_, i) => (
            {
                id: i,
                userId: faker.string.uuid(),
                username: faker.internet.userName(),
                avatar: faker.image.avatar(),

            }
        ));

        setSuggestions(suggestions);
        // console.log(suggestions);
    }, []);

    return (
        <div className='flex space-x-3  p-6 bg-white mt-8 border-gray-200 border rounded-lg overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>

            {session && (
                <Story
                    img={session.user.image}
                    username={session.user.username}
                />
            )}

            {suggestions.map((profile) => (
                <Story
                    key={profile.id}
                    img={profile.avatar}
                    username={profile.username}
                />
            ))}
        </div>
    );
}

export default Stories;
