import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, posts } = body

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Blotato API key is required' },
        { status: 400 }
      )
    }

    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json(
        { error: 'No posts provided' },
        { status: 400 }
      )
    }

    // Call Blotato API to schedule/post content
    const results = []

    for (const post of posts) {
      try {
        const response = await fetch('https://api.blotato.com/v1/posts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: post.content,
            platforms: [post.platform], // linkedin, twitter, etc.
            hashtags: post.hashtags || [],
            schedule: 'now', // or provide a datetime for scheduling
          }),
        })

        if (response.ok) {
          const data = await response.json()
          results.push({
            platform: post.platform,
            success: true,
            postId: data.id || 'posted',
          })
        } else {
          const errorData = await response.json().catch(() => ({}))
          results.push({
            platform: post.platform,
            success: false,
            error: errorData.message || `HTTP ${response.status}`,
          })
        }
      } catch (error) {
        results.push({
          platform: post.platform,
          success: false,
          error: error instanceof Error ? error.message : 'Network error',
        })
      }
    }

    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length

    return NextResponse.json({
      success: failCount === 0,
      message: `Posted ${successCount}/${posts.length} posts successfully`,
      results,
    })

  } catch (error) {
    console.error('Blotato API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to post to Blotato' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Blotato Integration API',
    endpoints: {
      POST: 'Post content to social media via Blotato',
    },
  })
}
