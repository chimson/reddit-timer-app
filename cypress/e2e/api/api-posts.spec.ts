import response from '../../fixtures/pushshiftapi-response.json';

describe('/api/posts tests', () => {
  it('returns 200 status code on when requested subreddit exists', () => {
    cy.interceptAndSearch({ subreddit: 'webdev' });

    cy.wait('@getPosts').its('response.statusCode').should('equal', 200);
  });

  it('returns data that deep-equals pushshift-response.json fixture', () => {
    cy.interceptAndSearch({ subreddit: 'reactjs' });

    cy.wait('@getPosts').its('response.body').should('deep.equal', response);
  });

  it('single post deep-equals redditpost-response.json', () => {
    const post = {
      data: [
        {
          author: 'dulajkavinda',
          created_utc: 1614335585,
          id: 'lsv023',
          score: 820,
          subreddit: 'reactjs',
          title:
            'Built an app to solve the media bias in our country towards politicians. you can view every side of the story just by sliding a toggle!',
        },
      ],
    };

    cy.interceptAndSearch({ subreddit: 'reactjs', fixture: 'redditpost-response.json' });

    cy.wait('@getPosts').its('response.body').should('deep.equal', post);
  });
});

// eslint-disable-next-line jest/no-export
export {};
