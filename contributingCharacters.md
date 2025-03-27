# Contributing Characters

Noticed something incorrect? Want to add a new character? This is how you can edit [characters.json](https://github.com/alpharmi/macchiato.app/blob/main/client/src/data/characters.json).

# Notes

Please remember majority of values will be in snake_case for programming reasons. In some cases values may includes spaces and proper capitalisation because they will be displayed on the page.

If you dont want to go in-game or manually write alot of content. Some content can be found and adapated from the [wiki](https://iopwiki.com/wiki/GFL2_Doll_Index). Huge thanks to those who contributed to that already.

Thank you in advance for any contributions, it saves alot of time.

# Basic Info

| key | value | note |
| --- | --- | --- |
| name | "character_name" |
| rarity | "ssr", "sr" |
| element | "burn", "hydro", "freeze", "electric", "corrosion" | **don't** add if no element or melee user. |
| role | "vanguard", "sentinel", "bulwark", "support" |
| role_descriptions | ["single_target_damage"] | these can be found in-game on the character screen. anything seperated by a / in-game counts as a new entry. |
| affiliation | "Zucchero Café" | no idea where in-game, can generally be found on the wiki. **if unknown keep empty**. |
| signature | "bittersweet_caramel" | though named "signature", **please use their best in slot**. this applies to standard characters and sr units. |
| weapons | ["eulogistic_verse", ["walther_wa2000", "Walther WA2000"]] | second best in slot (ssr weapon), then sr pick. **please use this order** because it's hard coded to display the rarity colours in that way. for weapons that use a display name, add an array with the regular name, then display name. |
| attachments.sets | ["ice_boost", "phase_strike] | **strictly a limit of two recommendations**. |
| attachments.subStats | ["Crit DMG%", "ATK%", "ATK", "Crit HIT%"] | **order left-to-right** of sub stat recommendations. |
| description | "Character Description." | **Try to keep to 2-3 sentences**. if you're stuck take a read at existing character descriptions for an idea. |
| voiceActors | {"jp": ["戸松 遥", "Haruka Tomatsu"], "cn": ["謝莹", "Xie Ying"], "kr": ["이명호", "Lee Myeongho"]} | **native language first**, than romanisation. japanese kanji are seperated in last name, than first. |

# Skills

Character's skills are seperated into `"basic_attack"`, `"skill_1" (active 1)`, `"skill_2" (active 2)`, `"ultimate"`, and `"passive"`.

**When writing skill descriptions please make sure to use the following open and close tags** to highlight / colour specific text. Try to keep this accurate to in-game or on the wiki to make sure everything is formatted correctly.

## Getting skill icons

**Uploading the skill icon images are not neccessary.** Though if you'd like to, most of the time the skill icon can be found on the wiki, if not you can screenshot the in-game ones and edit out the background to be transparent. 
Images are uploaded under `/client/public/skills/`.

## Tags

| tag | properties | note |
| --- | --- | --- |
| `<hl></hl>` | | highlights text gold. generally used when the skill describes amounts of something, stats like percentages, or when referencing a skill. though subjective if you believe something should be highlighted for legability that the original content doesn't, do it anyway. |
| `<el></el>` | burn, hydro, freeze, electric, corrosion | colours text to an element. generally used when a skill inflicts a type of damage. |
| `<ef></ef>` | | highlights text light blue. used for when a skill references a status effect. |

## Values

| key | value | note |
| --- | --- | --- |
| name | "skill_name" | |
| stats | {"cooldown": 0, "confectance_points": 0, "stability_damage": 2} | **leave as 0 to not display**. |
| description | "Skill Description." | **use tags here**. |
| quote | "Skill Quote." | can generally be found under the skill description in-game or wiki. |
| levels[].fortification | 0 | fortification level needed to unlock level for skill. **if a skill includes any amount of fortification upgrades, please make sure to add 0 by default**. **do not add if there's no fortification levels**.
| levels[].description | "Level Description" | **use tags here** |
| image_overwrite | "sniper_rifle" | extended names of "AR", "SR", etc. **Make sure to use this for the basic_attack** skill to use one of the default skill icons. |

## Keys

Nodes are split into groups by character levels; `20`, `30`, and `40` like in-game. Common keys also share level 40.

Each node includes two keys, one above, and one below. Currently each character only has one common key so that will take an entire node.

Key description formatting also uses the [tags](#tags) as referenced before for skill descriptions.

| key | value | note |
| --- | --- | --- |
| node.level | 20, 30, 40 | common keys also use level 40. |
| keys.name | "Key Name" |
| keys.type | "fixed", "common" |
| keys.description | "Key Description | **use tags here** |
