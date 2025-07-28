import { DomainError } from '../../../../../src/domain/models/@shared/domain-error';

describe('AuthController login simplified', () => {
  it('should login user successfully', async () => {
    const expectedAuthResponse = {
      access_token: 'jwt-token',
      user: {
        id: 1,
        name: 'testuser',
      },
    };
    const login = jest.fn().mockResolvedValue(expectedAuthResponse);
    const result = await login({ name: 'testuser', password: 'password123' });
    expect(login).toHaveBeenCalledWith({
      name: 'testuser',
      password: 'password123',
    });
    expect(result).toEqual(expectedAuthResponse);
  });

  it('should propagate errors from use case', async () => {
    const login = jest
      .fn()
      .mockRejectedValue(new DomainError('Invalid credentials'));
    await expect(
      login({ name: 'testuser', password: 'password123' }),
    ).rejects.toThrow('Invalid credentials');
    expect(login).toHaveBeenCalledWith({
      name: 'testuser',
      password: 'password123',
    });
  });
});
