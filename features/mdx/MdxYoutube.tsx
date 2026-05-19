import { YouTubeEmbed } from '@next/third-parties/google'

export default function MdxYoutube({id}: {id: string}) {
  return <YouTubeEmbed videoid={id}  />
}