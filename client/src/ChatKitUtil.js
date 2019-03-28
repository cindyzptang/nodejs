import Chatkit from '@pusher/chatkit-server';

const instanceLocator = 'v1:us1:39023abe-c71c-4dfc-9f94-74a3798d5fc3';
const key = '74a7aff1-838f-4705-abd5-291d7d36470e:SLmVnw3HotDVpl0hsN8UqhiCmx8p0tHz4OjkTYisS2Y=';
const tokenProviderUrl =
    'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/39023abe-c71c-4dfc-9f94-74a3798d5fc3/token';
const generalRoomId = '19419391';

const chatkit = new Chatkit({
    instanceLocator,
    key,
});

export { instanceLocator, key, tokenProviderUrl, generalRoomId, chatkit };
