const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create a simple in-memory database for blog posts
const blogPosts = [
  { id: 1, title: 'Chicken pasta bake', content: ' 4 tbsp olive oil1 onion, finely chopped 2 garlic cloves, crushed ¼ tsp chilli flakes 2 x 400g cans chopped tomatoes 1 tsp caster sugar 6 tbsp mascarpone 4 skinless chicken breasts, sliced into strips 300g penne 70g mature cheddar, grated 50g grated mozzarella ½ small bunch of parsley, finely chopped ' },
  { id: 2, title: 'Creamy tofu curry with homemade roti', content: '400g firm tofu 2 tbsp cornflour 4 tbsp vegetable oil 5 tbsp tikka or madras paste 2 white onions, thinly sliced 1 tbsp tomato purée 500g tomato passata 200g creamed coconut 15g coriander, roughly chopped (optional) For the roti 100g plain or wholemeal flour, plus extra for dusting 1 tsp vegetable oil' },
];

// Render the main page with all blog posts
app.get('/', (req, res) => {
  res.render('index', { blogPosts });
});

// Render the "Add New Blog Post" page
app.get('/add', (req, res) => {
  res.render('add');
});

// Handle the form submission to add a new blog post
app.post('/add', (req, res) => {
  const { title, content } = req.body;
  const id = blogPosts.length + 1;
  blogPosts.push({ id, title, content });
  res.redirect('/');
});

// Render the individual blog post with "Read More" option
app.get('/blog/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = blogPosts.find((post) => post.id === id);
  if (post) {
    res.render('blog', { post });
  } else {
    res.status(404).send('Blog post not found.');
  }
});

app.listen(1000, () => {
  console.log('Server is running on http://localhost:1000');
});
