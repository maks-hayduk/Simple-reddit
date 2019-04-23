import { UserPostsPipe } from './user-posts.pipe';

describe('UserPostsPipe', () => {
  it('create an instance', () => {
    const pipe = new UserPostsPipe();
    expect(pipe).toBeTruthy();
  });
});
