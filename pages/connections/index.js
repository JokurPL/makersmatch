import { user as userModel } from 'models';
import { getSession, useSession } from 'next-auth/client';

import BaseLayout from 'components/BaseLayout';
import Link from 'next/link';
import { getAllConversation } from 'services/conversations/getAllConversations';
import Loader from 'components/Loader';
import { totalCount } from 'services/conversations/totalCount';
import Pagination from 'components/Pagination';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export const getServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });

  if (!session) return { notFound: true };

  const currentUser = await userModel.findUnique({
    where: {
      email: session.user.email
    }
  });

  const searchTerm = query.searchTerm;
  const perPage = 1;
  const count = await totalCount({ userId: currentUser.id, searchTerm });
  const pagesCount = Math.ceil(count / perPage);
  const page = Number(query.page || 1);

  const conversations = await getAllConversation({
    userId: currentUser.id,
    searchTerm,
    perPage,
    page: page - 1,
    pagesCount
  });

  const filters = [];
  if (searchTerm) {
    filters.push(`searchTerm=${searchTerm}`);
  }

  return {
    props: {
      conversations,
      page,
      pagesCount,
      filters
    }
  };
};

const Search = () => {
  const router = useRouter();
  const searchRef = useRef();

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const term = searchRef.current.value;

      router.push(`/connections?searchTerm=${term}`);
    }
  };

  return (
    <div className="w-full flex px-2 mt-2 mb-2">
      <div className="w-full sm:w-64 inline-block relative ">
        <input
          onKeyDown={handleKey}
          ref={searchRef}
          name="searchBox"
          className="leading-snug border border-gray-300 block w-full appearance-none bg-gray-100 text-sm text-gray-600 py-2 px-4 pl-8 rounded-lg"
          placeholder="Search"
        />

        <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">
          <svg
            className="fill-current h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 511.999 511.999">
            <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function Connections({ conversations, page, pagesCount, filters }) {
  const [session, loading] = useSession();

  if (loading) {
    return <Loader />;
  }

  return (
    <BaseLayout>
      <Search />
      <div className="border-t-2">
        {conversations.map((conversation) => {
          return (
            <Link key={`conversation-${conversation.id}`} href={`/connections/${conversation.id}`}>
              <div
                className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-gray-100"
                style={{ cursor: 'pointer' }}>
                <div className="w-1/4">
                  {conversation.users.map(({ user }) => (
                    <img
                      key={user.id}
                      src={user.image}
                      className="inline-block m-0.5 object-cover h-12 w-12 rounded-full"
                      alt="Profile pitcure"
                    />
                  ))}
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">
                    {conversation.messages[conversation.messages.length - 1] === undefined
                      ? "You don't have any messages with this user"
                      : conversation.messages[conversation.messages.length - 1]?.user.name ===
                        session.user.name
                      ? `You to ${
                          conversation.users[0].user.name === session.user.name
                            ? conversation.users[1].user.name
                            : conversation.users[0].user.name
                        }:`
                      : `${
                          conversation.messages[conversation.messages.length - 1]?.user.name
                        } to You:`}
                  </div>
                  <span className="text-gray-500">
                    {conversation.messages[conversation.messages.length - 1]?.content}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination
        currentPage={page}
        href="/connections"
        pagesCount={pagesCount}
        filters={filters}
      />
    </BaseLayout>
  );
}
