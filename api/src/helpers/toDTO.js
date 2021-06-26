const userDTO = (data) => {
  let user = new Object();
  user.email = data.email;
  user.token = data.token;
  user.username = data.username;
  user.bio = data.bio;
  user.image = data.image;

  return user;
};

const profileDTO = (data) => {
  let profile = new Object();
  profile.username = data.username;
  profile.bio = data.bio;
  profile.image = data.image;
  profile.following = false;

  return profile;
};

const tagDTO = (data) => {
  let tags = data.map((tag) => tag.name);

  return tags;
};

const articleDTO = (data) => {
  let article = new Object();
  article.slug = data.slug;
  article.title = data.title;
  article.description = data.description;
  article.body = data.body;
  article.tagList = tagDTO(data.tagList);
  article.createdAt = data.createdAt;
  article.updatedAt = data.updatedAt;
  article.favorited = false;
  article.favoritesCount = 0;
  article.author = profileDTO(data);

  return user;
};

module.exports = { userDTO, profileDTO, tagDTO, articleDTO };
