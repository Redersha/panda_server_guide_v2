# 自定义音乐唱片
本篇基于：
* [Java版声音事件 - 中文 Minecraft Wiki](https://zh.minecraft.wiki/w/Java%E7%89%88%E5%A3%B0%E9%9F%B3%E4%BA%8B%E4%BB%B6)
* [音效 - 小默米的插件](https://xiao-momi.github.io/craft-engine-wiki/zh-Hans/configuration/sound/)

> 如果你没有音频处理和编写配置的能力，可以让`@再也不剪宣传片了`帮你做（如果心情很好的话）

## 步骤及要点
1. 准备音乐文件：
   1. ogg格式
   2. 单声道
2. 编写配置json（详见上面的链接）
3. 通过qq将音乐文件和json提交给腐竹

## 准备音乐
这里不会提供音乐，请自己准备。</br>
音频必须处理成单声道，格式要求ogg。</br>
[MP3 to OGG 格式转换 - FreeConverter](https://www.freeconvert.com/mp3-to-ogg)

## 写配置

!> 所有文件名和配置都不要出现中文和中文标点！

### 注册声音事件
新建`sounds.json`
```json
{
  "my_song": {
    "sounds": [
      {
        "name": "<命名空间>:music/my_song",
        "stream": true
      }
    ]
  }
}
```
**参数说明**：
- **my_song**：声音事件的ID，将用于后续配置引用
- **stream**: true：对长音乐必须开启流式加载
- **name**：音频文件路径，格式为`<命名空间>:路径/到/音频文件`（不带.ogg后缀）

### 创建曲目定义
新建`my_song.json`
```json
{
  "comparator_output": 5,
  "description": {
    "text": "My Custom Disc",
    "color": "light_purple"
  },
  "length_in_seconds": 180,
  "sound_event": "<命名空间>:my_song"
}
```
**参数说明**：
- **comparator_output**：唱片播放时红石比较器输出的信号强度（0-15）
- **description.text**：播放时显示的描述文字
- **length_in_seconds**：歌曲精确时长（秒），必须与音频文件一致
- **sound_event**：对应`sounds.json`中注册的声音事件ID

### 创建唱片物品
新建`music_disc_my_song.json.json`
```json
{
  "components": {
    "minecraft:jukebox_playable": {
      "song": "<命名空间>:my_song"
    },
    "minecraft:custom_name": {
      "text": "Music Disc - My Song",
      "color": "light_purple",
      "italic": false
    },
    "minecraft:rarity": "rare"
  },
  "item": "minecraft:music_disc_11"
}
```
**参数说明**：
- **song**：必须与`jukebox_song`配置中的ID一致
- **item**：使用原版唱片作为模板（如`music_disc_11`）

### 注意事项
1. **命名一致性**：三个配置文件中使用的ID必须保持一致
2. **时长精确**：`length_in_seconds`必须与音频实际时长完全一致