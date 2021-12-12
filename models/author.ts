import { Article, Image, Source } from "@models";

export interface SocialProfile {
  id: number;
  network?:
    | "facebook"
    | "twitter"
    | "instagram"
    | "github"
    | "linkedin"
    | "youtube"
    | "medium"
    | "google-plus"
    | "pinterest"
    | "codepen"
    | "slack"
    | "reddit"
    | "tumblr"
    | "twitch"
    | "vimeo"
    | "vine"
    | "soundcloud"
    | "quora"
    | "flickr"
    | "foursquare"
    | "dribbble"
    | "behance"
    | "digg"
    | "reddit-alien"
    | "stumbleupon"
    | "delicious"
    | "deviantart"
    | "vk"
    | "weibo"
    | "tencent-weibo"
    | "qq"
    | "wechat"
    | "xing"
    | "meetup"
    | "slideshare"
    | "skype"
    | "whatsapp"
    | "email"
    | "rss"
    | "telegram"
    | "sms"
    | "phone"
    | "snapchat"
    | "line"
    | "viber"
    | "bbm"
    | "kakao"
    | "kakaotalk"
    | "naver"
    | "line-at"
    | "wechat-work"
    | "qq-work"
    | "wechat-work-at"
    | "qq-work-at"
    | "wechat-work-circle"
    | "qq-work-circle"
    | "wechat-work-square"
    | "qq-work-square"
    | "wechat-work-line"
    | "qq-work-line"
    | "wechat-work-square-line"
    | "qq-work-square-line"
    | "other";
  username: string;
  url: string;
}

export interface Person {
  address?: {
    street: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
  };
  avatar?: Image;
  biography?: string;
  birthDate?: Date;
  deathDate?: Date;
  email: string;
  firstName: string;
  gender: "male" | "female" | "other" | "unknown";
  id: number;
  lastName: string;
  middleName: string;
  phone: string;
  socials?: SocialProfile[];
  website?: string;
}

export interface Author extends Person {
  articles: Article['id'][];
  sources: Source['id'][];
}
