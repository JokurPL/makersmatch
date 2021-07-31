import { user } from 'models';
import { getSession } from 'next-auth/client';

import BaseLayout from 'components/BaseLayout';
import Link from 'next/link';
import { getAllConversation } from 'services/conversations/getAllConversations';

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) return { notFound: true };

  const currentUser = await user.findUnique({
    where: {
      email: session.user.email
    }
  });

  const conversations = await getAllConversation({ userId: currentUser.id });

  return {
    props: {
      conversations
    }
  };
};

export default function Connections({ conversations }) {
  return (
    <BaseLayout>
      <div className="border-t-2">
        {conversations.map((conversation) => {
          return (
            <Link key={`conversation-${conversation.id}`} href={`/connections/${conversation.id}`}>
              <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
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
                    {conversation.messages[conversation.messages.length - 1].user.name}
                  </div>
                  <span className="text-gray-500">
                    {conversation.messages[conversation.messages.length - 1].content}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </BaseLayout>
  );
}
