const getRouter = require("express").Router();
var articleModel = require("../schemas/article");
var categoryModel = require("../schemas/categories");
var querystring = require("querystring");

getRouter.get("/getDataOnScrollEnd/:limit/:offset", getDataOnScrollEnd);
getRouter.get("/getCategoriesOnPageLoad", getCategoriesOnPageLoad);
getRouter.get("/createCategory/:name", createCategory);
getRouter.get("/editCategory/:id/:name", editCategory);
getRouter.get("/deleteCategory/:id", deleteCategory);
getRouter.get("/getDataOnPageLoad", getDataOnPageLoad);
getRouter.get("/deleteTopic/:deleteId", deleteTopic);
getRouter.get("/article*", loadByUrl);
getRouter.get("/get_post_by_category/:id", getBlogsByCategory);
getRouter.get("/logout", logout);

var mongoose = require('mongoose');
function getBlogsByCategory(req, res) {
  console.log('category id ', req.params.id);
  articleModel
    .find({"category":  new mongoose.Types.ObjectId(req.params.id)})
    .sort({ $natural: -1 })
    .exec(function(err, blogs) {
      if (err) {
        throw err;
      }
      console.log("get blogs by category ", blogs);
      res.json({
        success: true,
        message: "blogs by category",
        blogs: blogs
      });
    });
}

function createCategory(req, res) {
  console.log('req.params.name ', req.params.name);
  var category = new categoryModel({
    name: req.params.name
  });

  category.save(function(err, savedCategory) {
    if (err) throw err;
    console.log("new Category created", savedCategory);
    res.json({
      success: true,
      message: "created category",
      newCategory: savedCategory
    });
  });
}
function editCategory(req, res) {
ole.log('category update ', req.params.id);

  categoryModel.findOneAndUpdate({_id: req.params.id}, {name: req.params.name}, {new: true}, function(err, editedCategory){
    if(err) throw err;
    res.json({
      success: true,
      message: "Successful",
      updatedCategory: editedCategory
    });
  });
}

function deleteCategory(req, res) {
  categoryModel.findOneAndRemove({ _id: req.params.id }, function(err, deleted) {
    if (err) throw err;
    console.log("category deleted", req.params.id);
    res.json({
      success: true,
      message: "deleted category",
      deletedCategory: deleted
    });
  });
}

function getCategoriesOnPageLoad(req, res, next) {
  categoryModel.find({}, function(err, categories) {
    if (err) throw err;
    res.json({
      success: true,
      message: "Success",
      categories: categories
    });
  });
}

function logout(req, res, next) {
  req.logout();
  // techstack21_Security.logout(req, res);
  res.send({ redirect: "logout", role: "ROLE_USER", username: "" });
}

function getDataOnScrollEnd(req, res, next) {
  articleModel
    .find({})
    .sort({ $natural: -1 })
    .skip(parseInt(req.params.offset, 10))
    .limit(parseInt(req.params.limit, 10))
    .exec(function(err, articles) {
      if (err) {
        throw err;
      }
      return res.status(res.statusCode).send(articles);
    });
}

function getDataOnPageLoad(req, res, next) {
  articleModel
    .find({})
    .sort({ $natural: -1 })
    // .skip(parseInt(req.params.offset), 10)
    // .limit(parseInt(req.params.limit), 10)
    .exec(function(err, blogs) {
      if (err) {
        throw err;
      }
      res.json({
        success: true,
        message: "blogs",
        blogs: blogs
      });
      // return res.status(res.statusCode).send(articles);
    });
}

function loadByUrl(req, res, next) {
  var header_tag = require("../public_html/tags/header_tag.tag");
  var blog_post_details_USER = require("../public_html/tags/blog_post_details_USER.tag");
  var footer_tag = require("../public_html/tags/footer_tag.tag");
  var blog_sidebar_tag = require("../public_html/tags/blog_sidebar.tag");
  var blog_slide_menu_tag = require("../public_html/tags/blog_slide_menu.tag");

  // var post_title = req.url.split('article/')[1];
  var post_title = req.url.split("article/")[1].split("?fbclid")[0];
  console.log(" ");
  console.log(" ");
  console.log("post_title ", post_title);
  console.log(" ");
  console.log(" ");
  var dashed_url = post_title.split(" ").join("-");
  console.log(" ");
  console.log(" ");
  console.log("dashed_url:", dashed_url);
  console.log(" ");
  console.log(" ");
  var unescaped_url = querystring.unescape(dashed_url);
  console.log(" ");
  console.log(" ");
  console.log("unescaped_url ", unescaped_url);
  console.log(" ");
  console.log(" ");
  console.log(" ");
  console.log(" ");

  articleModel.find({ url: unescaped_url }, function(err, article) {
    if (err) {
      console.log("could not get article", err);
      return;
    }

    console.log(" ");
    console.log(" ");
    console.log("...................Printing article details................");
    console.log(" ");
    console.log(" ");
    console.log(
      "article[0] ",
      typeof article[0] !== "undefined" ? article[0] : article
    );
    console.log(" ");
    console.log(" ");
    console.log(
      "article[0].title ",
      typeof article[0].title !== "undefined" ? article[0].title : ""
    );
    console.log(" ");
    console.log(" ");
    console.log(
      "article[0].postImageUrl ",
      typeof article[0].postImageUrl !== "undefined"
        ? article[0].postImageUrl
        : ""
    );
    console.log(" ");
    console.log(" ");
    console.log(
      "article[0].details ",
      typeof article[0].details !== "undefined" ? article[0].details : ""
    );
    console.log(" ");
    console.log(" ");
    console.log(
      "article[0].url ",
      typeof article[0].url !== "undefined" ? article[0].url : ""
    );
    console.log(" ");
    console.log(" ");
    try {
      var postDetails,
        categories,
        blog_sidebar_tag_rendered,
        blog_slide_menu_tag_rendered,
        header_tag_rendered,
        blog_tag_rendered,
        footer_tag_rendered;

      // var authObject = techstack21_Security.getAuthentication();
      var authObject = {};

      console.log(
        "............................................................."
      );
      console.log(
        ".............SERVER-SIDE-RENDERING:START....................."
      );
      console.log(
        "............................................................."
      );

      header_tag_rendered = riot.render(header_tag, { role: "ROLE_USER" });
      blog_slide_menu_tag_rendered = riot.render(blog_slide_menu_tag, {
        role: "ROLE_USER"
      });
      blog_tag_rendered = riot.render(blog_post_details_USER, {
        article: article[0]
      });
      blog_sidebar_tag_rendered = riot.render(blog_sidebar_tag, {
        role: "ROLE_USER"
      });
      footer_tag_rendered = riot.render(footer_tag);

      var meta_details = {
        postImageUrl: article[0].postImageUrl,
        // title: article[0].title + " - techstack21.com",
        title: article[0].title,
        description: article[0].details.substring(0, 200) + "...",
        details: article[0].details,
        url: article[0].url
      };
      res.render("blog_post_details", {
        open_graph: meta_details,
        header_details: header_tag_rendered,
        slide_details: blog_slide_menu_tag_rendered,
        article_details: blog_tag_rendered,
        sidebar_details: blog_sidebar_tag_rendered,
        footer_details: footer_tag_rendered
      });

      console.log(
        "............................................................"
      );
      console.log(
        "............SERVER-SIDE-RENDERING:END......................."
      );
      console.log(
        "............................................................"
      );
    } catch (err) {
      console.log("=================================");
      console.error("POST error ", err.stack);
      console.log("=================================");
      return res.status(res.statusCode).send(err);
    }
  });
}

function deleteTopic(req, res, next) {
  articleModel.findByIdAndRemove(req.params.deleteId, function(
    err,
    deletedArticle
  ) {
    if (err) {
      throw err;
    }
    console.log("");
    console.log("");
    console.log("deleting article id: ", req.params.deleteId);
    console.log("");
    console.log("");
    console.log("article deleted:", deletedArticle);
    console.log("");
    console.log("");

    res.json({
      success: true,
      message: "blogs",
      blogId: deletedArticle._id
    });
  });
}

module.exports = getRouter;
