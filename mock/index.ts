import { MockMethod, Recordable } from 'vite-plugin-mock';

interface response {
  body: Recordable;
  query: Recordable;
}

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body, query }: response) => {
      console.log('body>>>>>>>>', body);
      console.log('query>>>>>>>>', query);
      return {
        code: 200,
        message: 'ok',
        data: { name: 'Evan', age: 26 },
      };
    },
  },
  {
    url: '/api/getVerificationCode', // 新增接口
    method: 'get',
    response: ({ query }: response) => {
      const { phoneNumber } = query; // 从查询参数中获取 phoneNumber
      console.log('请求获取验证码，手机号:', phoneNumber);
      return {
        code: 200,
        message: 'ok',
        data: { verificationCode: '123456' }, // 返回验证码
      };
    },
  },
  {
    url: '/api/validateCode', // 校验验证码
    method: 'post',
    response: ({ body }: response) => {
      const { phoneNumber, verificationCode } = body; // 从请求体中获取参数
      console.log(`验证手机号: ${phoneNumber}，验证码: ${verificationCode}`);
      return {
        code: 200,
        message: 'ok',
        data: { success: true }, // 返回验证成功
      };
    },
  },
] as MockMethod[];
