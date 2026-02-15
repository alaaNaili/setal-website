import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, ArrowLeft, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { getBlogPost, type BlogPost, getStrapiMediaUrl, formatDate, calculateReadingTime } from "@/services/strapi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadBlogPost();
    }
  }, [slug]);

  const loadBlogPost = async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);
      const postData = await getBlogPost(slug);
      
      if (!postData) {
        setError('Post not found');
        return;
      }
      
      setPost(postData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (platform?: 'facebook' | 'twitter' | 'linkedin') => {
    const url = window.location.href;
    const title = post?.titre || '';

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else {
      // Native share API
      if (navigator.share) {
        try {
          await navigator.share({ title, url });
        } catch (err) {
          console.log('Share cancelled');
        }
      }
    }
  };

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <Calendar className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="mb-4 text-3xl font-bold">
              {t('blog.postNotFound', 'Article non trouvé')}
            </h1>
            <p className="mb-8 text-muted-foreground">
              {error || t('blog.postNotFoundDescription', "L'article que vous recherchez n'existe pas ou a été supprimé.")}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('blog.goBack', 'Retour')}
              </Button>
              <Button onClick={() => navigate('/blog')}>
                {t('blog.viewAllPosts', 'Voir tous les articles')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = post.imagePrincipale?.formats?.large?.url 
    || post.imagePrincipale?.url;
  const category = post.category;
  const readingTime = calculateReadingTime(post.contenu);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('blog.backToBlog', 'Retour aux actualités')}
          </Button>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-8">
              {/* Category */}
              {category && (
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Tag className="h-3.5 w-3.5" />
                  {category.nom}
                </div>
              )}

              {/* Title */}
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {post.titre}
              </h1>

              {/* Excerpt */}
              {post.extrait && (
                <p className="mb-6 text-xl text-muted-foreground">
                  {post.extrait}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {/* Date */}
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </div>

                {/* Reading time */}
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readingTime} {t('blog.minRead', 'min')}
                </div>

                {/* Divider */}
                <div className="hidden h-4 w-px bg-border md:block" />

                {/* Share buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare()}
                    className="gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    {t('blog.share', 'Partager')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('facebook')}
                    className="h-8 w-8"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('twitter')}
                    className="h-8 w-8"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('linkedin')}
                    className="h-8 w-8"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {imageUrl && (
              <div className="mb-12 overflow-hidden rounded-2xl">
                <img
                  src={getStrapiMediaUrl(imageUrl)}
                  alt={post.imagePrincipale?.alternativeText || post.titre}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-3xl prose-h3:text-2xl prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-img:rounded-xl">
              <ReactMarkdown>{post.contenu}</ReactMarkdown>
            </div>

            {/* Footer */}
            <footer className="mt-12 border-t border-border pt-8">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate('/blog')}
                  className="group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  {t('blog.backToBlog', 'Retour aux actualités')}
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {t('blog.shareArticle', 'Partager cet article')}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  );
};

const BlogPostSkeleton = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          <Skeleton className="mb-4 h-6 w-24" />
          <Skeleton className="mb-6 h-12 w-full" />
          <Skeleton className="mb-6 h-6 w-3/4" />
          <div className="mb-8 flex gap-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="mb-12 h-96 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;