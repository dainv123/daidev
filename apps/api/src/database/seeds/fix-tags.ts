import { connect, disconnect, model } from 'mongoose';
import { Theme, ThemeSchema } from '../../themes/themes.schema';
import { Blog, BlogSchema } from '../../blogs/blogs.schema';
import { Tag, TagSchema } from '../../tags/tags.schema';

// const MONGODB_URI = 'mongodb://admin:password@localhost:27017/daidev?authSource=admin'; // Example MongoDB URI

const ThemeModel = model('Theme', ThemeSchema);
const BlogModel = model('Blog', BlogSchema);
const TagModel = model('Tag', TagSchema);

async function fixTagsToId() {
  await connect(process.env.MONGODB_URI);
  const tags = await TagModel.find({});
  const tagNameToId = {};
  tags.forEach(tag => {
    tagNameToId[tag.name] = tag._id.toString();
  });

  // Update Theme
  const themes = await ThemeModel.find({});
  for (const theme of themes) {
    if (theme.tags && theme.tags.length > 0 && typeof theme.tags[0] === 'string' && !theme.tags[0].match(/^[0-9a-fA-F]{24}$/)) {
      const newTags = theme.tags.map(t => tagNameToId[t] || t).filter(Boolean);
      theme.tags = newTags;
      await theme.save();
      console.log(`Updated Theme ${theme._id}:`, newTags);
    }
  }

  // Update Blog
  const blogs = await BlogModel.find({});
  for (const blog of blogs) {
    if (blog.tags && blog.tags.length > 0 && typeof blog.tags[0] === 'string' && !blog.tags[0].match(/^[0-9a-fA-F]{24}$/)) {
      const newTags = blog.tags.map(t => tagNameToId[t] || t).filter(Boolean);
      blog.tags = newTags;
      await blog.save();
      console.log(`Updated Blog ${blog._id}:`, newTags);
    }
  }
  await disconnect();
  console.log('✅ Fixed all tags to use _id!');
}

fixTagsToId();