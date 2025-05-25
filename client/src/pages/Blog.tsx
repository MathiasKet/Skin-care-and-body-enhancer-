import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Helmet } from "react-helmet";

// Blog Post Detail Component
const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load blog post. Please try again later.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link href="/blog">
            <Button variant="outline">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-[300px] w-full mb-8 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Blog Post Not Found</AlertTitle>
          <AlertDescription>
            The blog post you are looking for does not exist or has been removed.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link href="/blog">
            <Button variant="outline">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} - Body Enhance & Skincare Hub Blog`}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="bg-neutral py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/blog">
                <a className="text-primary hover:text-primary/80 font-medium flex items-center">
                  <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                  Back to Blog
                </a>
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-3">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{post.title}</h1>
                <p className="text-gray-600 text-lg italic mb-6">{post.excerpt}</p>
                
                <div className="prose max-w-none">
                  {/* In a real app, this would be properly formatted markdown or HTML content */}
                  <p className="mb-4">
                    {post.content}
                  </p>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
                  </p>
                  <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Why This Matters for Ghanaian Skin</h2>
                  <p className="mb-4">
                    Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
                  </p>
                  <ul className="list-disc pl-5 mb-4">
                    <li className="mb-2">Benefit one for Ghanaian climate and skin</li>
                    <li className="mb-2">Important consideration for the harmattan season</li>
                    <li className="mb-2">How to adapt during rainy season</li>
                    <li className="mb-2">Product recommendations for your specific needs</li>
                  </ul>
                  <p className="mb-4">
                    Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-serif font-bold mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                  Share
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                  Tweet
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Blog Listing Component
const BlogListing = () => {
  const [category, setCategory] = useState("all");
  
  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filteredPosts = category === "all" 
    ? blogPosts 
    : blogPosts?.filter(post => post.category.toLowerCase() === category);

  // Get unique categories
  const categories = blogPosts 
    ? ["all", ...new Set(blogPosts.map(post => post.category.toLowerCase()))]
    : ["all"];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load blog posts. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Skincare Blog - Body Enhance & Skincare Hub</title>
        <meta name="description" content="Expert skincare tips, advice, and education for Ghanaian skin. Learn about skincare routines, product recommendations, and solutions for common skin concerns." />
      </Helmet>

      <div className="bg-neutral py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Skincare Tips & Advice
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Expert guidance for beautiful Ghanaian skin. Learn about skincare routines, product recommendations, and solutions for common skin concerns.
            </p>
          </div>

          <div className="mb-8 flex justify-end">
            <div className="w-full max-w-xs">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-4 w-20 ml-3" />
                    </div>
                    <Skeleton className="h-7 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts && filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <a className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm ml-3">
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="font-serif font-semibold text-xl mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <span className="text-primary hover:text-primary/80 font-medium flex items-center">
                        Read Article
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <h2 className="text-2xl font-serif font-bold mb-2">No Posts Found</h2>
              <p className="text-gray-600 mb-4">
                {category !== "all" 
                  ? `There are no posts in the "${category}" category yet.` 
                  : "There are no blog posts available at the moment."}
              </p>
              {category !== "all" && (
                <Button onClick={() => setCategory("all")}>
                  View All Categories
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Main Blog Component that handles routing between listing and detail
const Blog = () => {
  const [, params] = useParams();
  
  // If we have a slug parameter, show the blog post detail
  if (params && Object.keys(params).includes("slug")) {
    return <BlogPostDetail />;
  }
  
  // Otherwise, show the blog listing
  return <BlogListing />;
};

export default Blog;
