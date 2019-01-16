/**
 * @name getAuthorName
 * @param {*} short string containing user names of blog post author(s)
 * @param {*} allAuthors  array containing all knows authors
 *
 * @description full author names are listed in data/authors/authors.json
 *
 * @returns string with full author names
 */
const getAuthorName = (short, allAuthors) => {
  // there might be multiple authors
  // if  no author is given we add a default author
  const postAuthors = short ? short.split(',') : ['admin'];

  let thisAuthor = '';
  let foundName;
  // retrieve post author name(s) from all authors
  postAuthors.forEach((authorName, index) => {
    // loop through all know authors and compare with post author(s)
    foundName = allAuthors.find(({ node }) => node.short === authorName.trim());
    // add author name to return string
    thisAuthor += `${foundName.node.name}`;
    // add comma if we have multiple authors names and this is not the last name
    if (postAuthors.length > 1 && index + 1 < postAuthors.length) {
      thisAuthor += ', ';
    }
  });
  return thisAuthor;
};

export default getAuthorName;
