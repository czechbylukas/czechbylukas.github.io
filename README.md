# main
main page

## Exercise images

In the animal, past-tense, and question-word exercise databases, image values
can be an Unsplash photo ID or a complete `https://images.unsplash.com/photo-...`
image address copied from Unsplash. The exercises normalize the image URL
automatically. Other image URLs are left unchanged.
When changing a Wikimedia animal image, also update its entry in
`exercise/A1/animals/image-credits.html` with the photo's author, source,
and license.

Click a vocabulary card to see its picture and forms; click outside or press
Escape to close it. During practice, click an image or focus it and press
Enter or Space to enlarge it.

The vocabulary previews let students mark known words. Unchecked words are
excluded from practice. Guests start with no words selected and their choices
last only for the current page session. Signed-in students use the existing
site login; their choices are stored in the Firebase Realtime Database under
`users/<uid>/exercise_selections`, subject to the existing database rules.
Previous browser-saved choices can optionally be imported without overwriting
choices already stored in the account.

The newer past-tense verb photos are free Unsplash photos: [writing][writing],
[shopping][shopping], [discussion][discussion], [travel][travel],
[driving][driving], [waiting][waiting], and [visiting][visiting].

The following abstract verbs use individual free Unsplash photos, sometimes
as visual metaphors:

| Verb | Photo source |
| --- | --- |
| Vysvětlit | [Teacher explaining](https://unsplash.com/photos/students-in-classroom-with-teacher-presenting-zFSo6bnZJTw) |
| Doporučit | [Thumbs up](https://unsplash.com/photos/woman-with-glasses-gives-a-thumbs-up-TkYe6WPIv6c) |
| Rozhodnout se | [Fork in the road](https://unsplash.com/photos/two-roads-between-trees-u0vgcIOQG08) |
| Vyjednávat | [Agreement](https://unsplash.com/photos/two-people-shaking-hands-over-a-piece-of-paper-4mEyvORkbN0) |
| Přesvědčit | [Persuasive conversation](https://unsplash.com/photos/a-woman-talking-to-a-man-at-a-table-pBJDpxw8Ptk) |
| Přizpůsobit se | [Chameleon](https://unsplash.com/photos/green-chameleon-on-brown-wooden-post-N_GrR8c2EMk) |
| Vyhodnotit | [Rating](https://unsplash.com/photos/a-row-of-yellow-stars-sitting-on-top-of-a-blue-and-pink-surface-0ZUoBtLw3y4) |
| Zprostředkovat | [Group discussion](https://unsplash.com/photos/three-women-sitting-beside-table-bwki71ap-y8) |
| Zdůvodnit | [Presenting evidence](https://unsplash.com/photos/woman-presenting-a-graph-to-an-audience-LzBMjkvZfh8) |
| Zohlednit | [Considering a checklist](https://unsplash.com/photos/hand-checking-off-items-on-a-to-do-list-fXlL5I0IvK0) |
| Specifikovat | [Pointing to details](https://unsplash.com/photos/two-people-reviewing-documents-at-meeting-table-TFFn3BYLc5s) |
| Zpochybnit | [Question mark](https://unsplash.com/photos/a-blue-question-mark-on-a-pink-background-oZuBNC-6E2s) |
| Reflektovat | [Thinking](https://unsplash.com/photos/a-woman-thinking-with-a-pen-at-her-desk-H2K8EFcIfWs) |
| Interpretovat | [Interpreting data](https://unsplash.com/photos/person-using-stylus-on-tablet-with-charts-ykgLX_CwtDw) |
| Formulovat | [Writing](https://unsplash.com/photos/a-person-writing-on-a-piece-of-paper-with-a-pen-8eSrC43qdro) |

[writing]: https://unsplash.com/photos/person-holding-pencil-writing-on-notebook-RdmLSJR-tq8
[shopping]: https://unsplash.com/photos/a-person-pushing-a-shopping-cart-full-of-food-CZtK_E89omo
[discussion]: https://unsplash.com/photos/man-talking-in-the-meeting-jfR5wu2hMI0
[travel]: https://unsplash.com/photos/woman-looking-at-map-while-standing-on-road-KeiUIl9Lzo4
[driving]: https://unsplash.com/photos/a-person-driving-a-car-152sDV0mvgU
[waiting]: https://unsplash.com/photos/people-wait-for-a-train-at-the-station-hCstpTNzmbY
[visiting]: https://unsplash.com/photos/a-group-of-people-looking-at-paintings-in-a-museum-DW-VFIo8W7Y
