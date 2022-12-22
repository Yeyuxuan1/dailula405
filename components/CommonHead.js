import BLOG from '@/blog.config'
import Head from 'next/head'
import { getSocialImageUrl } from '@/lib/get-social-image-url'

const CommonHead = ({ meta, children }) => {
  let url = BLOG.PATH?.length ? `${BLOG.LINK}/${BLOG.SUB_PATH}` : BLOG.LINK
  const image = meta?.image || BLOG.LINK + '/bg_image.jpg'

  const author = BLOG.author
  const authorImage = BLOG.LINK + '/avatar.png'
  const title = meta?.title || BLOG.TITLE
  const description = meta?.description || BLOG.DESCRIPTION
  const type = meta?.type || 'website'
  const detail = description
  const keywords = meta?.tags || BLOG.KEYWORDS
  const lang = BLOG.LANG.replace('-', '_') // Facebook OpenGraph 要 zh_CN 這樣的格式才抓得到語言
  const category = meta?.category || BLOG.KEYWORDS || '軟體科技' // section 主要是像是 category 這樣的分類，Facebook 用這個來抓連結的分類

  const socialImageUrl = getSocialImageUrl({
    title,
    image,
    author,
    authorImage,
    detail
  })

  if (meta) {
    url = `${url}/${meta?.slug}`
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="theme-color" content={BLOG.BACKGROUND_DARK} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no"
      />
      <meta name="robots" content="follow, index" />
      <meta charSet="UTF-8" />
      {BLOG.SEO_GOOGLE_SITE_VERIFICATION && (
        <meta
          name="google-site-verification"
          content={BLOG.SEO_GOOGLE_SITE_VERIFICATION}
        />
      )}
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:locale" content={lang} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {socialImageUrl
        ? (
        <>
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:image' content={socialImageUrl} />
          <meta property='og:image' content={socialImageUrl} />
        </>
          )
        : (
        <meta name='twitter:card' content='summary' />
          )}

      <meta property="og:site_name" content={BLOG.TITLE} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={title} />

      { BLOG.CUSTOM_FONT
        ? BLOG.CUSTOM_FONT_URL?.map(fontUrl =>
            <link href={`${fontUrl}`} key={fontUrl} rel="stylesheet"/>)
        : <link href='https://fonts.font.im/css2?family=Noto+Serif+SC&display=optional' rel="stylesheet"/> }

      {JSON.parse(BLOG.ANALYTICS_BUSUANZI_ENABLE) && <meta name="referrer" content="no-referrer-when-downgrade" />}
      {meta?.type === 'Post' && (
        <>
          <meta
            property="article:published_time"
            content={meta.date || meta.createdTime}
          />
          <meta property="article:author" content={BLOG.AUTHOR} />
          <meta property="article:section" content={category} />
          <meta property="article:publisher" content={BLOG.FACEBOOK_PAGE} />
        </>
      )}
      {children}
    </Head>
  )
}

export default CommonHead
