import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

const BlogPreview = () => {
  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog?limit=3"],
  });

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Failed to load blog posts</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Skincare Tips & Advice
            </h2>
            <p className="text-gray-600">Expert guidance for beautiful Ghanaian skin</p>
          </div>
          <Link href="/blog">
            <a className="hidden md:block text-primary hover:text-primary/80 font-medium">
              View All Articles
              <ChevronRight className="h-4 w-4 inline ml-1" />
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-neutral rounded-xl overflow-hidden shadow-md">
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
              ))
            : blogPosts?.map((post) => (
                <div
                  key={post.id}
                  className="bg-neutral rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
                >
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
                    <Link href={`/blog/${post.slug}`}>
                      <a className="text-primary hover:text-primary/80 font-medium flex items-center">
                        Read Article
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/blog">
            <a className="text-primary hover:text-primary/80 font-medium">
              View All Articles
              <ChevronRight className="h-4 w-4 inline ml-1" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
