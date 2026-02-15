import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Tag, TrendingUp } from "lucide-react";
import { getBlogPosts, BlogPost, getStrapiMediaUrl, formatDate, calculateReadingTime } from "@/services/strapi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const Blog = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    loadBlogPosts();
  }, [currentPage]);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBlogPosts(currentPage, pageSize);
      setPosts(response.data);
      setTotalPages(response.meta.pagination?.pageCount || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero-subtle py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" />
          <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl animate-float-delay" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <TrendingUp className="h-4 w-4" />
              {t('blog.badge', 'Actualités')}
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              <span className="text-gradient">{t('blog.title', 'Actualités')}</span>
              <br />
              {t('blog.subtitle', '& Nouvelles')}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              {t('blog.description', 'Restez informé des dernières nouvelles, mises à jour et histoires de notre communauté')}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {error && (
            <div className="mb-8 rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-center">
              <p className="text-destructive">{error}</p>
              <Button 
                onClick={loadBlogPosts} 
                variant="outline" 
                className="mt-4"
              >
                {t('blog.retry', 'Réessayer')}
              </Button>
            </div>
          )}

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: pageSize }).map((_, i) => (
                <BlogPostSkeleton key={i} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t('blog.noPosts', 'Aucun article disponible')}
              </h3>
              <p className="text-muted-foreground">
                {t('blog.noPostsDescription', 'Revenez bientôt pour de nouvelles actualités!')}
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <BlogPostCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    {t('blog.previous', 'Précédent')}
                  </Button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className="h-10 w-10 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    {t('blog.next', 'Suivant')}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
      <Footer />
    </>
  );
};

const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const { t } = useTranslation();
  const imageUrl = post.imagePrincipale?.formats?.medium?.url 
    || post.imagePrincipale?.url;
  const category = post.category;
  const readingTime = calculateReadingTime(post.contenu);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-card animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={getStrapiMediaUrl(imageUrl)}
            alt={post.imagePrincipale?.alternativeText || post.titre}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-hero-subtle">
            <Calendar className="h-12 w-12 text-primary/30" />
          </div>
        )}
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
            <Tag className="h-3 w-3" />
            {category.nom}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt)}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {readingTime} {t('blog.minRead', 'min')}
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold leading-tight transition-colors group-hover:text-primary">
          {post.titre}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {post.extrait}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
          {t('blog.readMore', 'Lire plus')}
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};

const BlogPostSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <div className="mb-3 flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="mb-2 h-6 w-full" />
        <Skeleton className="mb-4 h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};

export default Blog;