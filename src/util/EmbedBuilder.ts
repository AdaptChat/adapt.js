import {
    MessageEmbed,
    MessageEmbedAuthor,
    MessageEmbedField,
    MessageEmbedFooter,
  } from "../types";
  
  export class EmbedBuilder implements MessageEmbed {
    description?: string;
    fields?: MessageEmbedField[];
    footer?: MessageEmbedFooter;
    hue?: number;
    image?: string;
    thumbnail?: string;
    timestamp?: string | Date;
    title?: string;
    color?: number;
    type: "image" | "rich" | "video" | "meta" = "rich";
    url?: string;
    author?: MessageEmbedAuthor;
  
    constructor() {
      Object.assign(this);
    }
  
    setType(type: "image" | "rich" | "video" | "meta"): this {
      this.type = type;
      return this;
    }
  
    setTitle(title: string): this {
      this.title = title;
      return this;
    }
  
    setHue(hue: number): this {
      this.hue = hue;
      return this;
    }
  
    setAuthor(author: MessageEmbedAuthor): this {
      this.author = author;
      return this;
    }
  
    setFooter(footer: MessageEmbedFooter): this {
      this.footer = footer;
      return this;
    }
  
    setTimestamp(timestamp: string | Date): this {
      this.timestamp = timestamp;
      return this;
    }
  
    setColor(color: number): this {
      this.color = color;
      return this;
    }
  
    setImage(image: string): this {
      this.image = image;
      return this;
    }
  
    setThumbnail(thumbnail: string): this {
      this.thumbnail = thumbnail;
      return this;
    }
  
    setDescription(description: string): this {
      this.description = description;
      return this;
    }
  
    setFields(fields: MessageEmbedField[]): this {
      this.fields = fields;
      return this;
    }
  
    setURL(url: string): this {
      this.url = url;
      return this;
    }
  
    toJSON(): MessageEmbed {
      return {
        title: this.title,
        description: this.description,
        url: this.url,
        image: this.image,
        thumbnail: this.thumbnail,
        color: this.color,
        type: this.type,
        author: this.author,
        fields: this.fields,
        footer: this.footer,
        hue: this.hue,
        timestamp: this.timestamp,
      };
    }
  };  