import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Download, ChevronLeft, ChevronRight, X,
  Heart, Music, Sun, Moon, Play, SortAsc, Clock,
  Maximize2, Minimize2, Plus, Trash2, Upload,
  Eye, EyeOff, Lock, Check, LogOut, FileText,
  AlertCircle, Loader2,
} from "lucide-react";

// ─── Preset Songs ─────────────────────────────────────────────────
const PRESET_SONGS: { title: string; lyrics: string }[] = [
  { title: "나는 예배자입니다", lyrics: `나는 하나님을 예배하는 예배자입니다
내가 서 있는 곳 어디서나 하나님을 예배합니다
내 영혼 거룩한 은혜를 향하여
내 마음 완전한 하나님 향하여
이곳에서 바로 이 시간 하나님을 예배합니다` },
  { title: "나는 주님께 속한 자", lyrics: `이 땅의 내 삶이 비록 버겁더라도
주님의 선하심 나 믿으며 가리
이 작은 자 통해 주가 이뤄가시니
감사로 사는 삶 나 살기 원하네
내 삶의 시간 속에 주 일하시네
내 모든 여정 속에 함께 하시네
깊고도 크신 주의 영광을 나 보리라
위대하신 주

나는 주님께 속한 자 되어
주의 나라 위해 전심으로 살리라
주의 마음에 합한 자 되어
맡기신 소명 이루리` },
  { title: "나는 주님을 찬양합니다", lyrics: `나는 주님을 찬양합니다 새 노래로 주를 찬양
나는 주님을 찬양합니다 새 노래로 주를 찬양
주를 찬양 새 노래로 주를 찬양
주를 찬양 새 노래로 주를 찬양

할렐루야 할렐루야 할렐루야
할렐루야 할렐루야 할렐루야

나는 주님을 송축합니다 새 노래로 주를 찬양
나는 주님을 송축합니다 새 노래로 주를 찬양` },
  { title: "나는 주만 높이리", lyrics: `나는 주만 높이리 결코 내 맘 변치 않네
세상 모든 권세 모든 영광 십자가 앞에 다 버리고
나의 충성과 내 헌신 내 모든 소망 오직 예수
나무에 달려 죽으신 그 분께

오직 우리 주께 내 믿음 소망 찬양 받기 합당한 분
또 오직 만왕의 왕께 엎드려 경배하며 모두 드리리
나를 지으시고 아버지 되시며 나를 구원하사
하늘의 상 주실 오직 우리 주님께 나 찬양하리` },
  { title: "나를 만나주세요", lyrics: `하나님을 예배합니다
오늘도 나를 만나주세요
하나님께 나아갑니다
오늘도 나를 만나주세요

하나님이 부르신 은혜의 자리로
하나님을 만나는 은혜의 자리로
예배하는 이곳에서
주의 은혜를 기다립니다` },
  { title: "나를 통하여", lyrics: `지금 서 있는 이곳에서 높임을 받으소서
내가 밟는 땅 주님의 땅이니
하늘이 주의 이름 높이 올리며
넓은 바다가 주를 노래해
모든 만물 주를 경배해
모든 입술 주를 찬양해

천지를 만드신 만물의 통치자
높임을 받으소서
내 평생에 주의 이름 높이며
어느 곳에서든지 주님을 예배하리라
내가 밟는 모든 땅
아버지의 영광이 선포돼야 하리
찬양하며 주님을 예배할 때
하늘 가득한 주의 영광 보리라

나를 통하여 나의 입술을 인하여
주의 이름 높임을 받으소서` },
  { title: "나아가네", lyrics: `지금도 나를 원하시나요
내가 주님께 필요 없어도
나의 존재가 의미 있나요
아무런 도움 되지 못해도

지금 나 드릴 것이라곤
깨지고 상한 마음
지금 난 나아갈 곳은
은혜의 보좌 앞

나아가네 나아가네
나아가네 주께로
나아가네 나아가네
나아가네 주께로` },
  { title: "나의 가는 길", lyrics: `나의 가는 길 주님 인도하시네
그는 보이지 않아도 날 위해 일하시네
주 나의 인도자 항상 함께하시네
사랑과 힘 베푸시며 인도하시네

광야에 길을 만드시고 날 인도해
사막에 강 만드신 것 보라
하늘과 땅 변해도 주의 말씀 영원히
내 삶 속에 새 일을 행하리` },
  { title: "나의 믿음 주께 있네", lyrics: `나의 믿음 주께 있네
십자가 능력이 내 영광 되었네
주께서 우리를 승리케 하시니
나의 능력 나의 소망 주께 있네

오직 예수 나의 믿음
십자가 능력 속에 빛나는 영광
내 모든 승리로 주님께 영광을
나의 힘 나의 소망 오직 예수` },
  { title: "나의 시선을", lyrics: `나의 시선을 주께로 돌리고
잠잠히 주 행하신 일 기다리면서
내 주를 마주할 그 날 그 언젠가
나를 반겨주실 내 주님 품에 안기리

나의 시선을 주께 두고
내 안의 의심을 모두 버리네
주 허락하신 소망으로
나는 편안히 쉼을 얻네
내 모든 호흡을 주님은 아시리
나 주님 한분만 의지하리` },
  { title: "나의 약함은 나의 자랑이요", lyrics: `참 고마운 친구 나의 예수님
나는 깨지기 쉬운 질그릇과 같으나
때론 낙심해도 포기치 않음은
예수의 생명이 내 안에 있기에

내 삶의 동행자 나의 예수님
나는 기대가 없는 어린 나귀 같으나
늘 쓰러지나 다시 일어남도
예수의 생명이 내 안에 있기에

나의 약함은 나의 자랑이요
나의 실패는 나의 간증이요
나의 아픔은 나의 영광이니
그 부르심 따라 내가 걸어갑니다

나 가난함은 나의 상급이요
나 미련함은 나의 자랑이요
나 쓰러짐이 나의 고백이니
그 부르심 따라 내가 걸어갑니다` },
  { title: "나의 주 나의 하나님이여", lyrics: `나의 주 나의 하나님이여 주를 경배합니다
주 사랑하는 나의 마음을 주께서 아시나이다
깨뜨릴 옥합 내게 없으며
주께 드릴 향유 없지만
하나님 형상대로 날 빚으사
새 영을 내게 부어 주소서

고통 속에 방황하는 내 마음
주께로 갈 수 없지만
저항할 수 없는 그 은혜로
주님의 길을 걷게 하소서` },
  { title: "나의 피난처 예수", lyrics: `나의 피난처 예수 의지해요
나의 피난처 예수 의지해요
나의 가는 길에 거센 바람 몰아쳐와도
나의 피난처 예수 의지해요

나는 영원히 주님 사랑해요
나는 영원히 주님 사랑해요
세상 어떤 것도 나의 사랑 끊을 수 없네
나는 영원히 주님 사랑해요

아바 아버지 나를 사랑하시니
나의 모든 것 주께 드려요
아바 아버지 내가 여기 있으니
주님 영광 위하여 써주세요` },
  { title: "나의 하나님", lyrics: `나의 하나님 나의 하나님 나와 함께하신 하나님
주님 뜻대로 살기 원하여 이처럼 간구합니다
아버지 아버지 죄인 부르신 아버지
감사합니다 감사합니다 늘 찬송하게 합소서
아버지 아버지 은혜 베푸신 아버지
감사합니다 감사합니다 영광 받아 주옵소서

전능하신 나의 하나님 내겐 두려움 전혀 없네
생명주신 주 나의 하나님 내 영혼에 기쁨 넘치네
은혜주신 나의 하나님 내 눈물을 씻어 주시네
평화주시는 주 나의 하나님 모든 염려 물리치시네

주는 나의 소망이시고 나의 전부 되시니
이 세상에 모든 것 내겐 의미가 없어
주 여호와 나의 하나님 내겐 부족함 전혀 없어라` },
  { title: "내 구주 예수를 더욱 사랑", lyrics: `1절
내 구주 예수를 더욱 사랑
엎드려 비는 말 들으소서
내 진정 소원이 내 구주 예수를
더욱 사랑 더욱 사랑

2절
이 전엔 세상 낙 기뻤어도
지금 내 기쁨은 오직 예수
다만 내 비는 말 내 구주 예수를
더욱 사랑 더욱 사랑

3절
이 세상 떠날 때 찬양하고
숨질 때 하는 말 이것일세
다만 내 비는 말 내 구주 예수를
더욱 사랑 더욱 사랑 아멘` },
  { title: "내 삶을 깨뜨립니다", lyrics: `주 앞에 나아가오니
내 삶을 깨뜨립니다
나의 뜻을 꺾으시고
주 뜻만 이루소서

내 마음을 비우시고
오직 주만 채우소서
깨뜨려서 주 쓰시고
다시 빚어 주소서` },
  { title: "내 안에 부어 주소서", lyrics: `성령이여 내 안에 부어 주소서
주님의 사랑과 은혜 부어 주소서
내 마음과 생각과 삶이
주님의 것으로 채워지도록
성령이여 내 안에 부어 주소서` },
  { title: "내 주를 가까이", lyrics: `1절
내 주를 가까이 하게 함은
내게 복됨이니
세상 모든 것 잃고 주를
얻는다면 족하네

2절
나의 생명 길 되시고
진리 되시니
오직 주만 따라가며
주를 가까이 하리` },
  { title: "내 평생에", lyrics: `내 평생에 주의 은혜로
살아왔고 또 살아가리
내 생명 다 바쳐
주를 찬양하리
주의 은혜 끝없어라

내 평생에 주의 은혜
찬양하며 살아가리` },
  { title: "내가 예수를 못박았습니다", lyrics: `내가 예수를 못박았습니다
내 죄로 그 못을 박았습니다
십자가에 달리신 예수
내 죄 값을 치르셨네

나의 죄가 주를 괴롭혔고
나의 죄가 주를 죽였으니
이제 나 회개하고
주 앞에 엎드려
용서 구하며 살아가리` },
  { title: "너는 내 아들이라", lyrics: `너는 내 아들이라
오늘 내가 너를 낳았도다
두려워하지 말라
내가 항상 너와 함께 하리라

너는 내 자녀라
영원히 사랑받는 자라
하나님의 자녀된
영광 안에 살아가리` },
  { title: "너를 위해", lyrics: `너를 위해 내 삶 드리리
주님 나를 쓰시오
귀한 생명 드리신 주
내가 어찌 아끼리

너를 위해 모든 드리리
주님 나를 받으소서
오직 주만 기쁘시게
살아가게 하소서` },
  { title: "놀라운 주의 사랑", lyrics: `놀라운 주의 사랑
어느 곳보다 깊고 넓어
세상 끝까지 펼쳐지고
하늘 높이 닿으시네

나를 사랑하신 주
값진 피 흘려 구원하셨네
이제 나 찬양하리
주 사랑 영원토록` },
  { title: "높이 계신 주께", lyrics: `높이 계신 주께
모든 영광 돌리세
천사들도 찬양하고
만물도 다 찬양하네

보좌에 앉으신 주
영원히 통치하시니
온 마음 다해 찬양해
높이 계신 주께` },
  { title: "더 원합니다", lyrics: `주님의 은혜를 더 원합니다
주님의 사랑을 더 원합니다
세상 것 다 버리고
주님만을 사모하니
내 마음 주님 향해
더욱 깊이 사랑합니다` },
  { title: "돌아서지 않으리", lyrics: `나 주님 향해 나아가되
결코 돌아서지 않으리
뒤에 것 잊고 앞 것 향해
주님만을 쫓아가리

세상 것 다 버리고
오직 주만 의지하리
나의 길 주님께 맡기고
결코 돌아서지 않으리` },
  { title: "두려워 말라", lyrics: `두려워 말라 내가 너와 함께 함이니
놀라지 말라 나는 너의 하나님이라
너를 붙들어 주리니
내 의로운 오른손으로

나 주 너의 하나님
항상 너와 함께 하시네` },
  { title: "마라나타", lyrics: `마라나타 주 예수여
어서 오시옵소서
온 세상 기다리는
주의 날이 속히 오소서

하늘 문을 여시고
주의 백성 맞으러
구원의 주 예수여
어서 오시옵소서` },
  { title: "만군의 여호와", lyrics: `만군의 여호와
주의 이름 높이시니
온 땅이 그 영광 가득하네

만군의 여호와
보좌에 앉으신 주
천사들도 찬양하며
거룩하다 외치네

거룩 거룩 거룩하다
만군의 여호와` },
  { title: "만복의 근원 하나님", lyrics: `만복의 근원 하나님
모든 은혜 주시는 분
하늘과 땅의 모든 것
주님으로 말미암네

주님께서 내게 주신
복이 얼마나 큰지
누가 헤아릴 수 있으리
오직 주만 찬양하리` },
  { title: "말씀 앞에서", lyrics: `말씀 앞에 나아와
두려움으로 엎드리네
살아있는 주의 말씀
내 마음 깊이 새기리

주 말씀은 내 발 등이요
내 길에 빛이 되시니
말씀 따라 살아가며
주 뜻대로 행하리` },
  { title: "메마른 곳에서", lyrics: `메마른 이 땅에
비를 내리소서
마른 내 영혼에
성령의 비 내리소서

주님의 은혜로
다시 살아나
푸르게 피어나
열매 맺게 하소서` },
  { title: "목 마르고 지친 영혼", lyrics: `목 마르고 지친 영혼
주님 앞에 나아가네
생명의 샘 되시는 주
내 마음 적셔 주소서

힘없고 지친 내 영혼
주 품에 안아 주시니
새 힘 얻어 살아가리
주님만을 의지하리` },
  { title: "목마른 예배자", lyrics: `목마른 내 영혼
주님을 찾아가네
갈급한 내 마음
주님만을 사모하네

생명수 되시는 주
내게 마시게 하소서
주님 앞에 엎드려
오직 주만 찬양하리` },
  { title: "믿음이 없이는", lyrics: `믿음이 없이는
하나님을 기쁘시게 못하나니
하나님께 나아가는 자는
반드시 그가 계신 것과
또 자기를 찾는 자들에게
상 주시는 이심을 믿으라

그러므로 나는 믿네
주님 살아 계시네` },
  { title: "반석 위에", lyrics: `반석 위에 나의 삶 세우고
주님 앞에 겸손히 엎드려
지나간 날들 돌아보며
눈물로 회개하오니

주 자비로운 눈으로
나를 보시고 용서하소서
다시 새롭게 주의 은혜로
살아가게 하소서` },
  { title: "반짝반짝", lyrics: `하나님 만드신
밤하늘의 별들아
반짝반짝 빛나며
주를 찬양하여라

해와 달도 빛나고
모든 별들 찬양하니
하나님의 영광이
온 하늘에 펼쳐지네` },
  { title: "변함없는 완전하신 주님", lyrics: `변함없는 완전하신 주님
언제나 동일하신 주
어제도 오늘도 영원히
같으신 우리 주님

세상은 변하고
모든 것 사라져도
주님 말씀 영원토록
변치 않으시네` },
  { title: "부르신 곳에서", lyrics: `주님 나를 부르신 그 곳에서
주님 뜻대로 살아가리
어려운 환경 속에라도
주님 함께 하시니

두려움 없이 나아가며
주님만을 의지하리
부르신 곳에서
충성되게 살아가리` },
  { title: "비 준비하시니", lyrics: `주님 비 준비하시니
메마른 땅에 비 내리듯
마른 내 영혼에
주의 은혜 내리소서

기다리는 내 마음에
때 맞춰 주시는 은혜
주님만을 기다리며
나아가게 하소서` },
];

const PRESET_SONGS_2: { title: string; lyrics: string }[] = [
  { title: "감사", lyrics: `오늘 숨을 쉬는 것 감사
나를 구원하신 것 감사
내 뜻대로 안돼도 주가 인도하신 것
모든 것 감사
내게 주신 모든 것 감사
때론 가져가심도 감사
내게 고난 주셔서 주 뜻 알게 하신 것
모든 것 감사
주님 감사해요 주님 감사해요
내가 여기까지 온 것도 은혜입니다
주님 감사해요 주님 감사해요
나를 사랑하신 주 사랑 감사합니다
항상 주 안에 있음 감사
참된 소망 주심도 감사
나 같은 사람도 자녀 삼아 주신 것
모든 것 감사` },
  { title: "감사함으로", lyrics: `여호와를 즐거이 불러
기쁨으로 주께 나아가리
여호와 하나님 난 주의 백성
기르시는 양이라
감사함으로 주를 높이며 그 문에 들어가서
찬송함으로 그 이름을 송축할지어다
주의 선함과 인자하심이 영원하고
주의 신실하심이 대대에 미치리로다` },
  { title: "거룩하신 주", lyrics: `거룩 거룩 거룩 만군의 주여
거룩 거룩 거룩 만군의 주여
거룩 거룩 거룩 만군의 주여
그 영광이 온 땅에 충만
그 영광이 온 땅에 충만
그 영광이 온 땅에 충만
거룩하신 주
존귀하신 예수 하나님 어린양
존귀하신 예수 하나님 어린양
온 세상 죄를 구속하셨네
온 세상 죄를 구속하셨네
온 세상 죄를 구속하셨네
어린양 예수
거룩하신 주 이름 찬양할 때
거룩하신 주 이름 찬양할 때
경외함으로 주께 경배하네
주는 교만한 자를 낮추시니
고통 중에 주님을 보게 되리
오늘 우리 죄악 인해
주님 얼굴 가리셨다 해도
주님의 긍휼 의지해
부르짖을 때 주님 나를 고치시리
주님의 이름 선포해 나의 도움 되시는 주를 찬양해
이젠 눈물을 그치고 기쁨으로 새 날을 맞이하리
주님의 은혜 감사해 나의 슬픔 변하여 춤추게 하네
나를 온전케 하시네 주의 사랑 영원히 찬양하리라` },
  { title: "고백", lyrics: `나의 헛된 마음이 주를 외면했네요
나의 위로를 찾아 삶을 헤매였네요
나는 이제야 주를 보아요
주께 더 나아갈게요
나는 이제 알아요 그 은혜와 사랑을
그는 항상 내 옆에 함께하셨다는 걸
작고 연약한 내 맘을
놓지 않고 지켜주신 나의 주
그는 날 아시며 나를 사랑하신 내 주
내가 떠나도 날 기다리신 주
지친 내 마음을 품고 안아주신 내 주
주여 내 삶을 모두 드립니다` },
  { title: "광대하신 주", lyrics: `광대하신 주 전능하신 왕
전능하신 주 만물의 주관자
하나님께 영광 우리 왕께 영광
주님께 영광 만물의 주관자
온 세상 위에 가장 높으신 그 이름
그 능력 크도다 만물을 창조하셨네` },
  { title: "구원의 반석", lyrics: `구원의 반석 주 나의 반석 찬양
구원의 반석 주 나의 반석 찬양
오 주님께 영광 오 주님께 영광
주를 높이리 그의 이름 영원히
주를 높이리 거룩한 손 들고
주를 높이리 그의 이름 영원히
나는 주를 높이리 나는 주를 높이리
주 내 반석과 힘 내 산성 내 피난처
주 밖에 누구를 두려워하리` },
  { title: "그 이름 여호와", lyrics: `환란의 날에 나의 피난처시라
환란의 날에 나의 도움이시라
이 하루 살아낼 믿음의 이름
만군의 주 여호와
시련의 날에 나의 산성이시라
시련의 날에 나의 구원이시라
이 하루 지켜낼 소망의 이름
만군의 주 여호와
나의 삶을 돌보며 나를 기억하시네
그가 자녀 삼은 자 두 손으로 지켜주시네
주 나와 함께하네 삶의 등불 되신 나의 주
난 믿음으로 서네 살아계신 주와 영원히` },
  { title: "그렇게 살아가리", lyrics: `나의 일생 사는 동안
주 예수만 따라가리
주님이 보여주신 삶
나 그렇게만 살으리
환란이 닥쳐와도
내 목숨을 빼앗으려 해도
내 주님 바라보며
그렇게 살아가리
내게 주신 사명 모두 마치는 그 날까지
멈추지 않으리 쉬지도 않으리
내 생명도 아끼지 않으리
이 땅에 사는 내 소망 주 위해 사는 것
오직 예수만 오직 예수만 내 삶에 드러나길
하늘의 크신 능력이 나를 이끄시네
그 이름만 그 이름만 외치며 살리` },
  { title: "기쁨으로", lyrics: `기쁨으로 찬양 드리는 자 하나님의 영광 보리라
기쁨으로 서로 손을 들고서
주님을 찬양해 찬양하세 할렐루야
즐거웁게 서로 춤을 추면서
주님을 경배해 경배하세
전심으로 찬양 드리는 자 하나님의 영광 보리라
전심으로 서로 손을 들고서
주님을 찬양해 찬양하세 할렐루야
즐거웁게 서로 춤을 추면서
주님을 경배해 경배하세` },
  { title: "깊어진 삶을 주께", lyrics: `은혜로 날 보듬으시고
사랑으로 품어 주셔도
내 마음 한 자락도 지키지 못하는
이 모습 부끄럽습니다
따스한 곁을 내어주신
주님 앞에 나아갑니다
표현 못할 긍휼로 나를 붙드시는
주 이름만 바라봅니다
매일 마주한 슬픔을 견뎌 나가며
주 예수의 마음을 닮아가네
두려운 걸음마다 주가 동행하니
주 의지하며 오늘을 걷네
주의 신실한 소망을 깊이 담으며
주 예수의 풍요를 채워가네
하나님의 자녀로 명예 지켜가며
깊어진 삶을 주께 드리네` },
  { title: "꽃들도", lyrics: `이곳에 생명샘 솟아나
눈물 골짝 지나갈 때에
머잖아 열매 맺히고
웃음소리 넘쳐나리라
꽃들도 구름도 바람도 넓은 바다도
찬양하라 찬양하라 예수를
하늘을 울리며 노래해 나의 영혼아
은혜의 주 은혜의 주 은혜의 주
그날에 하늘이 열리고
모든 이가 보게 되리라
마침내 꽃들이 피고
영광의 주가 오시리라` },
  { title: "나 같은 죄인 살리신", lyrics: `나 같은 죄인 살리신
주 은혜 놀라워
잃었던 생명 찾았고
광명을 얻었네
큰 죄악에서 건지신
주 은혜 고마워
나 처음 믿은 그 시간
귀하고 귀하다
이제껏 내가 산 것도
주님의 은혜라
또 나를 장차 본향에
인도해 주시리
거기서 우리 영원히
주님의 은혜로
해처럼 밝게 살면서
주 찬양하리라 아멘` },
  { title: "나 오직 주를", lyrics: `닫혀진 마음에
주님의 사랑은
빛이 되어 만져 주시고
절망의 땅에도
주님의 사랑은
그의 나라 보게 하시네
지나간 날보다
허락한 오늘에
또 새로운 은혜 주시니
영원히 빛나는 그 사랑 안에서
나의 삶은 완성되어가네
소망없는 인생의 아픔 속에도
내 아버지 주님의 사랑 노래하리라
세월 지나 세상이 끝난다 해도
나 오직 주를 찬양하리라` },
  { title: "빛이 있으라", lyrics: `어두운 이 세상에 빛이 있으라
주님 말씀하시니 빛이 되었네
주님은 세상의 참 빛이시라
어둠 속에서도 길 비추시네
우리도 주님의 빛 되어
세상 어두운 곳 밝게 비추리
주님의 사랑 밝은 빛 되어
모든 만물 향해 비추이리
어둠이 아무리 짙다 할지라도
주의 빛 앞에는 물러가리라
우리 주 예수 참 빛 되시어
영원토록 비추시리라` },
  { title: "사랑 중에 사랑", lyrics: `세상의 그 어떤 사랑도
주의 사랑과 비교 못하네
끝없이 넓고 깊은 사랑
오직 주님만이 주시네
우리가 서로 사랑하는 것도
주의 사랑으로부터 비롯되니
서로 아껴주고 감싸주며
주님 사랑 전하여 주리라
사랑은 언제나 인내하고
사랑은 친절하며 질투하지 않네
사랑은 변하지 않으니
주의 안에서 서로 사랑하라` },
  { title: "삶의 모든 순간에", lyrics: `삶의 모든 순간에 주님 함께하시니
기쁠 때나 슬플 때나 주님 찬양하리
해 뜰 때와 해 질 때도 주님 찬양하며
언제나 주님 안에서 기쁨 누리리
우리가 걱정하는 것들 주께 맡기라
주님은 우리의 모든 것 아시고 계시니
주의 은혜 매일매일 새롭게 되시니
삶의 모든 순간 주께 감사하며 살리
주님의 사랑 매일 우리와 함께하시니
어떤 일이 있다 해도 두려워 말라
주의 손에 우리 생명 맡기고 있으니
삶의 끝 그 날까지 주와 함께하리라` },
  { title: "생명과 바꾼 주의 사랑을", lyrics: `생명과 바꾼 주의 사랑을
어찌 보답할 길 있으리까
나를 위해 주신 그 큰 사랑
내 생명 다 바쳐 찬양하리
십자가 위에서 흘리신 피
나의 죄 깨끗이 씻기셨네
나 같은 죄인 살리신 주
은혜로 구원하여 주셨네
주님의 사랑 내 생명보다
더욱 귀하고 소중하니
하늘나라 그 날에 가서도
영원토록 주의 사랑 찬양하리` },
  { title: "시간을 뚫고", lyrics: `세월 흘러가고 세상 변해가도
주의 말씀 영원토록 변치 않으시네
시간을 뚫고 주의 사랑 오시어
우리에게 영원한 소망 주시네
주님은 어제도 오늘도 영원토록
변함없이 우리와 함께 하시니
지난 날도 오늘도 다가올 날도
언제나 주님의 은혜 안에 있으리
우리가 살아가는 이 짧은 시간
주님의 사랑 안에서 의미 있네
시간을 뚫고 영원으로 가는 길
오직 주님만 따라서 가오리` },
  { title: "시선", lyrics: `나의 시선을 주님께 고정하고
세상의 것들 외면하여라
보이지 않는 주님을 바라보며
믿음의 길을 걸어가라
잠시 동안 보이는 것들은
다 지나가고 말 것들이라
오직 영원히 변치 않는 주
바라보며 나아가라
어려운 일이 앞을 가려도
주의 얼굴만 바라보아라
시선을 주님께 고정하면
어두운 길도 밝게 되리라` },
  { title: "신실하신 주", lyrics: `주의 자비와 인내 어찌 다 헤아릴까
대대에 신실하신 우리의 하나님
하늘과 땅에 주님의 영광 충만하니
온 세상이 주님의 신실함을 말하네
우리가 넘어지고 방황할지라도
주님은 결코 버리지 않으시네
언제나 품에 안아 주시며
다시 일어나게 하여 주시네
우리의 삶이 주님의 신실하심으로
견고히 서 있게 되오니
끝까지 변함없는 주의 사랑
영원토록 찬양하며 살아가리라` },
  { title: "십자가를 참으신", lyrics: `십자가를 참으신 우리 주 예수
수치를 생각지 않으시고
앞에 있는 기쁨 바라보시며
십자가의 고통 당하셨네
우리 죄 위하여 주님 찔리시고
우리 허물 위하여 못 박히셨네
그 찢기신 상처로 우리 고침 받고
그 흘리신 피로 우리 죄 씻기네
이제 보좌 우편에 앉으신 주
하나님 오른편에서 다스리시니
주의 이름 위에 모든 무릎 꿇고
모든 입이 주 예수 주라 시인하네` },
  { title: "아바 아버지", lyrics: `아바 아버지 우리를 부르시네
사랑하는 자녀 삼아 주시고
언제나 품에 안아 주시며
영원토록 인도하여 주시네
하늘에 계신 우리 아버지여
주의 이름 거룩히 되게 하시고
주의 나라 임하시옵기를
주의 뜻 하늘처럼 땅에서도
우리에게 일용할 양식 주시고
우리 죄 사하여 주시옵소서
우리를 시험에 빠지지 않게
악에서 구하여 주시옵소서` },
  { title: "약할 때 강함 되시네", lyrics: `내 마음이 약하고 힘 빠질 때
주님의 능력 내게 덧입혀지네
약할 때 주님의 강함 나타나니
오직 주만 의지하며 나아가리
주님의 은혜로 살아가는 나
내 힘으로는 아무 것도 못하지만
주님 함께 하시면 능히 이겨내리
약할 때 강함 되시는 주
세상의 것 의지하지 않고
오직 주의 능력 의지하리
끝까지 주님과 함께 한다면
어떤 환란도 이겨내리라` },
  { title: "어린 양 찬양해", lyrics: `하늘에서 천사들이 찬양하네
보좌에 앉으신 어린양께
거룩 거룩 만군의 주여
할렐루야 영원토록
땅에서 모든 만물이 찬양하네
죄 없으신 어린양 예수
온 세상 죄를 지고 가신 주
찬양하세 어린양께
보좌를 중심으로 모든 존재가
엎드려 경배하며 찬양하네
권세와 영광과 능력이
우리 하나님과 어린양께 영원토록` },
  { title: "에덴 놀이터", lyrics: `에덴동산에 주님 걸으시던
그 날의 향기 아직 남아있네
푸른 풀밭과 맑은 시냇가에서
주님과 함께 거닐고 싶네
주님 앞에 마음껏 뛰어놀며
기쁨으로 주님께 노래하네
하나님 자녀 된 우리에게
주의 품은 영원한 놀이터라
다시 그 날이 오게 되면은
주님과 함께 영원히 살리
눈물 없고 슬픔도 없는 곳
에덴에서 주와 함께 살리` },
  { title: "여호와 나의 목자", lyrics: `여호와는 나의 목자시니
내가 부족함 없으리라
푸른 풀밭에 나를 누이시고
쉴 만한 물가로 인도하시네
내 영혼을 소생시키시고
의의 길로 인도하여 주시네
주님의 이름을 위하여라
비록 죽음의 그림자 지나도
두려워할 것 없나이다
주님 함께 하시니 지팡이와 막대기
나를 위로하여 주시네
내 생명의 날 동안 주와 함께하리` },
  { title: "여호와 우리 주여", lyrics: `여호와 우리 주여
온 천하에 주의 이름 어찌 그리
아름다운지요
주의 영광 하늘 위에 빛나시네
인생이 무엇이기에 주님 기억하시고
사람이 무엇이기에 돌보시나이까
잠시 천사보다 못하게 하셨으나
영광과 존귀로 관 씌우셨네
주의 손으로 만드신 것들 보시며
모든 것 발 아래 두셨으니
우리의 양과 소와 들판의 짐승들
하늘의 새와 바다의 물고기까지라` },
  { title: "영원한 나의 집", lyrics: `주님은 나의 살아계신 하나님
나의 발 붙들어 주시는 분
이 세상 잠시 머물다 가지만
하늘에 영원한 집 있으니
이 땅의 집은 흙으로 지어져
언젠가는 쇠하고 허물어지나
하늘에 지어진 그 집은
영원토록 빛나리라
우리가 이 땅에서 걸을 때
주님의 집 향해 나아가리
눈물 없는 그 나라에 가서
주님과 영원토록 함께 살리` },
  { title: "예수 나의 치료자", lyrics: `상한 마음 주님 앞에 내놓고
찢어진 마음 주님께 맡기니
주의 손 상한 곳 어루만지시고
십자가의 상처로 고쳐 주시네
예수 나의 치료자시라
주의 말씀하시면 고통 떠나가고
주의 손 내게 얹으시면
영혼과 육신 모두 고쳐지네
주님의 채찍으로 우리 고침 받고
주의 못 자국으로 온전케 되니
오직 주님만이 나의 치료자
영원토록 주님만 의지하리` },
  { title: "예수 어린양", lyrics: `예수 어린양 우리 죄 지고 가신 주
온 세상 죄를 씻어 주시는 어린양
보좌 가운데 계신 어린양
찬양과 영광과 능력 받으소서
희생 되신 어린양 우리 구원하셨네
주의 피로 우리를 사 주셨으니
각 족속과 방언과 백성들 중에서
하나님께 드릴 백성 사 주셨네
어린양께서 권세 받으시고
보좌에 앉으사 다스리시니
천사들과 모든 피조물이
엎드려 경배하며 찬양하세` },
  { title: "예수 우리들의 밝은 빛", lyrics: `어두운 이 세상에 빛으로 오신
예수 우리들의 밝은 빛이시라
주님을 보고 영혼이 밝아지고
주님을 따라가면 어두움 없어지네
예수는 세상에 오신 참 빛이시라
어둠이 그 빛을 깨닫지 못해도
주님을 믿는 자에게는 빛 되시어
영원토록 비추시네
우리도 주님의 빛을 받았으니
세상에 빛으로 살아가야 하리
어두운 곳에 사는 형제들에게
주의 빛 전하며 살아가리라` },
  { title: "예수 피를 힘입어", lyrics: `예수 흘리신 성스러운 피
우리 죄 깨끗이 씻어 주시네
그 피 공로 의지하여 우리는
담대히 주님 앞에 나아가리
하늘 보좌에 앉으신 주 예수
우리를 위하여 간구하시니
주의 피 힘입어 죄 사함 받고
의롭다 인정받게 되었네
어떤 죄악이 너를 책망할지라도
주의 피가 너를 정결하게 하네
대적이 우리를 책망하여도
주의 피 공로로 이겨내리라` },
  { title: "예수는 내 힘이요", lyrics: `예수는 나의 힘이요
예수는 나의 노래라
고난의 길 지나갈 때
주님은 나의 피난처라
어두운 길 걸어갈 때
주님은 나의 등불이라
희망 없던 내 인생에
빛과 소망 되신 주님
세상이 아무리 변해도
주님만은 변치 않으시네
예수는 나의 모든 것
영원토록 찬양하리라` },
  { title: "예수는 빛", lyrics: `예수는 세상의 빛이시라
그 분 따라가면 어두움 없고
생명의 빛 얻게 되리라
예수는 참 빛이시라
어두운 곳에 사는 백성들
큰 빛을 보게 되었으니
사망의 그늘진 곳에 앉은 자
빛이 비추이셨네
우리도 예수님 따라가며
세상에 빛으로 살아가리
어두운 세상 밝게 비추며
주의 사랑 전하여 주리라` },
  { title: "오셔서 여소서", lyrics: `주의 성령 오셔서 내 안에
충만히 부어 주시옵소서
메마른 내 영혼 적시시고
생명의 강물 흘러가게 하소서
주의 임재 오셔서 채워 주소서
텅 빈 내 마음 주님 채우시고
주님의 사랑로 덮어 주시어
두려움 없게 하여 주시옵소서
하나님 나를 향한 주의 사랑
오셔서 내 안에 불 태우시고
온 마음 다해 주 사랑하게
성령님 오셔서 불어 주소서` },
  { title: "오직 당신만 위해", lyrics: `내 삶의 목적 오직 하나
오직 당신만 위함이니
세상의 것들 아무리 좋아도
주님 앞에는 아무 것도 아니네
오직 주님만 위해 살아가리
오직 주님만 위해 드리리
나의 생명 나의 모든 것을
주님 뜻대로 사용하여 주소서
세상이 나를 향해 말하여도
오직 주님의 소리 듣고 싶네
나의 삶 끝 그 날까지
오직 당신만 위해 살아가리` },
  { title: "오직 주만이", lyrics: `세상에 의지할 것 없고
기댈 곳 오직 주님뿐
나의 생명 되신 주 예수
오직 주만이 나의 소망
오직 주만이 나의 힘이시고
오직 주만이 나의 반석
오직 주만이 나의 피난처
영원토록 주만 의지하리
세상이 아무리 변해가도
오직 주님만은 변치 않으시네
나의 마음 오직 주께 드리니
영원토록 주만 높이리라` },
  { title: "온 맘 다해", lyrics: `온 맘 다해 주님을 사랑하고
온 마음 다해 주님을 경배하리
내 힘 다해 주님을 찬양하며
내 생명 다해 주님만 따르리
주님은 나의 모든 것이시라
내 삶의 이유 되신 주님
하늘과 땅의 모든 것보다
주님을 더욱 사랑하리라
언제나 변함없는 주의 사랑
온 맘 다해 찬양하며 살아가리
끝까지 주님만 사랑하며
영원토록 주님만 따르리라` },
  { title: "우리 삶을 주께", lyrics: `우리의 삶을 주께 드리니
주의 뜻 가운데 거하게 하시고
우리의 발걸음 주님께서
인도하여 주시옵소서
우리의 마음을 주께 드리니
주의 말씀으로 채워 주시고
우리의 생각도 주님께서
다스려 주시옵소서
우리의 모든 것을 주께 드리니
주님의 영광 나타나게 하소서
우리가 살아가는 이 모든 날
오직 주의 뜻 이루어지게 하소서` },
  { title: "우리 함께 기도해", lyrics: `하나님 아버지 앞에 나아와
우리 함께 손을 모으고
서로 사랑하며 기도하니
주님 들어주시옵소서
어려운 일 당한 형제 있으면
서로 돕고 위로하여 주며
주님의 사랑 전하여 주므로
기쁨으로 함께 기도하세
우리의 기도 하늘에 닿아
주의 은혜 내려 주시기를
서로 아끼고 사랑하며
항상 함께 기도하여 주소서` },
  { title: "우린 걸어가네", lyrics: `믿음의 길을 우린 걸어가네
주님의 약속 따라 나아가며
비록 어둡고 좁은 길이라도
주님 함께 하시니 두렵지 않으리` },
];

// ─── Types ────────────────────────────────────────────────────────
interface Song {
  id: string;
  title: string;
  lyrics: string;
  slides: string[];
  pptName: string | null;
  pptData: string | null;
  dateAdded: number;
}

interface BulkItem {
  file: File;
  title: string;
  status: "pending" | "loading" | "done" | "error";
  pptData?: string;
}

type SortMode = "alpha" | "recent" | "favorites";

// ─── Constants ────────────────────────────────────────────────────
const SONGS_KEY   = "pw-songs-v4";
const FAV_KEY     = "pw-fav-v3";
const THEME_KEY   = "pw-theme-v1";
const ADMINPW_KEY = "pw-adminpw-v3";
const DEFAULT_PW  = "Qwer3342**";
const MAX_SONGS   = 1000;

// ─── Helpers ──────────────────────────────────────────────────────
function readAsDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = e => res(e.target!.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function nameToTitle(filename: string) {
  return filename
    .replace(/\.(pptx?|pdf)$/i, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\[.*?\]/g, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTwoLineSlides(lyrics: string): string[] {
  const lines = lyrics.split("\n").map(l => l.trimEnd());
  const slides: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim() === "") { i++; continue; }
    const pair = [lines[i]];
    if (i + 1 < lines.length && lines[i + 1].trim() !== "") pair.push(lines[i + 1]);
    slides.push(pair.join("\n"));
    i += pair.length;
  }
  return slides.filter(Boolean);
}

async function generatePptx(song: Song) {
  const PptxGenJS = (await import("pptxgenjs")).default;
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  const lyricSlides = getTwoLineSlides(song.lyrics);
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: "000000" };
  titleSlide.addText(song.title, { x: 0, y: 2.5, w: "100%", h: 1.5, fontSize: 48, bold: true, color: "FFFFFF", align: "center", fontFace: "맑은 고딕" });
  for (const text of lyricSlides) {
    const slide = pptx.addSlide();
    slide.background = { color: "000000" };
    slide.addText(text, { x: 0.5, y: "20%", w: "92%", h: "60%", fontSize: 40, bold: true, color: "FFFFFF", align: "center", fontFace: "맑은 고딕", lineSpacingMultiple: 1.8 });
  }
  await pptx.writeFile({ fileName: `${song.title}.pptx` });
}

function downloadOriginalPpt(song: Song) {
  if (!song.pptData) return;
  const a = document.createElement("a");
  a.href = song.pptData;
  a.download = song.pptName || `${song.title}.pptx`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
}

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  const [songs, setSongs] = useState<Song[]>(() => {
    try { const r = localStorage.getItem(SONGS_KEY); return r ? JSON.parse(r) : []; }
    catch { return []; }
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { const r = localStorage.getItem(FAV_KEY); return r ? JSON.parse(r) : []; }
    catch { return []; }
  });
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light"
  );
  const [adminPw, setAdminPw] = useState(() => localStorage.getItem(ADMINPW_KEY) || DEFAULT_PW);

  const [sort,   setSort]   = useState<SortMode>("alpha");
  const [query,  setQuery]  = useState("");
  const [detail, setDetail] = useState<Song | null>(null);

  const [isAdmin,     setIsAdmin]     = useState(false);
  const [showLogin,   setShowLogin]   = useState(false);
  const [loginPw,     setLoginPw]     = useState("");
  const [loginErr,    setLoginErr]    = useState(false);
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [adminView,   setAdminView]   = useState(false);

  // Bulk upload state
  const [bulkItems,   setBulkItems]   = useState<BulkItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDone,  setUploadDone]  = useState(false);
  const [uploadTab,   setUploadTab]   = useState<"bulk" | "single">("bulk");

  // Single add form
  const [newTitle,   setNewTitle]   = useState("");
  const [newLyrics,  setNewLyrics]  = useState("");
  const [newPptName, setNewPptName] = useState<string | null>(null);
  const [newPptData, setNewPptData] = useState<string | null>(null);
  const [addOk,  setAddOk]  = useState(false);
  const [addErr, setAddErr] = useState("");

  const [delConfirm,   setDelConfirm]   = useState<string | null>(null);
  const [editLyricsId, setEditLyricsId] = useState<string | null>(null);
  const [editLyricsTxt,setEditLyricsTxt]= useState("");
  const [changePw,   setChangePw]   = useState("");
  const [pwOk,       setPwOk]       = useState(false);
  const [showChPw,   setShowChPw]   = useState(false);

  // Slideshow
  const [ssOpen,  setSsOpen]  = useState(false);
  const [ssMode,  setSsMode]  = useState<"text" | "image">("text");
  const [ssIdx,   setSsIdx]   = useState(0);
  const [ctrlVis, setCtrlVis] = useState(true);
  const [isFull,  setIsFull]  = useState(false);
  const hideRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX   = useRef(0);
  const songRef  = useRef<Song | null>(null);
  songRef.current = detail;

  useEffect(() => { try { localStorage.setItem(SONGS_KEY, JSON.stringify(songs)); } catch {} }, [songs]);
  useEffect(() => { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  useEffect(() => { localStorage.setItem(ADMINPW_KEY, adminPw); }, [adminPw]);
  useEffect(() => {
    const h = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  const showCtrls = useCallback(() => {
    setCtrlVis(true);
    if (hideRef.current) clearTimeout(hideRef.current);
    hideRef.current = setTimeout(() => setCtrlVis(false), 3000);
  }, []);

  useEffect(() => {
    if (ssOpen) showCtrls();
    else { setCtrlVis(true); if (hideRef.current) clearTimeout(hideRef.current); }
  }, [ssOpen, showCtrls]);

  useEffect(() => {
    if (!ssOpen) return;
    const handler = (e: KeyboardEvent) => {
      const song = songRef.current;
      if (!song) return;
      const slides = ssMode === "image" ? song.slides : getTwoLineSlides(song.lyrics);
      const max = slides.length - 1;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); setSsIdx(i => Math.min(i + 1, max)); showCtrls(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); setSsIdx(i => Math.max(i - 1, 0)); showCtrls(); }
      if (e.key === "Escape")     closeSS();
      if (e.key === "f" || e.key === "F") toggleFull();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [ssOpen, ssMode, showCtrls]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 50 || !songRef.current) return;
    const slides = ssMode === "image" ? songRef.current.slides : getTwoLineSlides(songRef.current.lyrics);
    const max = slides.length - 1;
    if (diff > 0) setSsIdx(i => Math.min(max, i + 1));
    else          setSsIdx(i => Math.max(0, i - 1));
    showCtrls();
  }, [ssMode, showCtrls]);

  const closeSS = () => {
    setSsOpen(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };
  const toggleFull = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  };
  const openSS = (song: Song, mode: "text" | "image") => {
    setDetail(song); setSsMode(mode); setSsIdx(0); setSsOpen(true);
  };
  const toggleFav = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);
  };
  const doLogin = () => {
    if (loginPw === adminPw) {
      setIsAdmin(true); setAdminView(true);
      setShowLogin(false); setLoginPw(""); setLoginErr(false);
    } else { setLoginErr(true); }
  };
  const doLogout = () => { setIsAdmin(false); setAdminView(false); };

  // ── Bulk Upload ────────────────────────────────────────────────
  const handleBulkSelect = async (files: FileList) => {
    const arr = Array.from(files);
    const items: BulkItem[] = arr.map(f => ({ file: f, title: nameToTitle(f.name), status: "pending" }));
    setBulkItems(items);
    setUploadDone(false);
  };

  const startBulkUpload = async () => {
    if (bulkItems.length === 0) return;
    setIsUploading(true);
    const newSongs: Song[] = [];

    for (let i = 0; i < bulkItems.length; i++) {
      setBulkItems(prev => prev.map((it, j) => j === i ? { ...it, status: "loading" } : it));
      try {
        const pptData = await readAsDataUrl(bulkItems[i].file);
        const title = bulkItems[i].title.trim() || nameToTitle(bulkItems[i].file.name);
        newSongs.push({
          id: `${Date.now()}-${i}`,
          title, lyrics: "", slides: [],
          pptName: bulkItems[i].file.name, pptData,
          dateAdded: Date.now() + i,
        });
        setBulkItems(prev => prev.map((it, j) => j === i ? { ...it, status: "done", pptData } : it));
      } catch {
        setBulkItems(prev => prev.map((it, j) => j === i ? { ...it, status: "error" } : it));
      }
    }

    setSongs(prev => [...newSongs, ...prev]);
    setIsUploading(false);
    setUploadDone(true);
    setTimeout(() => { setBulkItems([]); setUploadDone(false); }, 4000);
  };

  const updateBulkTitle = (i: number, title: string) => {
    setBulkItems(prev => prev.map((it, j) => j === i ? { ...it, title } : it));
  };

  const removeBulkItem = (i: number) => {
    setBulkItems(prev => prev.filter((_, j) => j !== i));
  };

  // ── Single Add ─────────────────────────────────────────────────
  const handleSinglePpt = async (file: File) => {
    const data = await readAsDataUrl(file);
    setNewPptName(file.name); setNewPptData(data);
    if (!newTitle) setNewTitle(nameToTitle(file.name));
  };

  const doAddSong = () => {
    if (!newTitle.trim()) { setAddErr("제목을 입력해주세요."); return; }
    if (songs.length >= MAX_SONGS) { setAddErr("저장 한도에 도달했습니다."); return; }
    setSongs(prev => [{ id: Date.now().toString(), title: newTitle.trim(), lyrics: newLyrics.trim(), slides: [], pptName: newPptName, pptData: newPptData, dateAdded: Date.now() }, ...prev]);
    setNewTitle(""); setNewLyrics(""); setNewPptName(null); setNewPptData(null);
    setAddErr(""); setAddOk(true); setTimeout(() => setAddOk(false), 3000);
  };

  const [editSlides, setEditSlides] = useState<string[]>([]);

  const startEditLyrics = (song: Song) => {
    setEditLyricsId(song.id);
    setEditLyricsTxt(song.lyrics);
    setEditSlides(song.slides);
    setDelConfirm(null);
  };
  const saveEditLyrics = () => {
    setSongs(prev => prev.map(s => s.id === editLyricsId ? { ...s, lyrics: editLyricsTxt, slides: editSlides } : s));
    setEditLyricsId(null);
  };
  const addEditSlides = async (files: FileList) => {
    const results: string[] = [];
    for (const f of Array.from(files)) {
      try { results.push(await readAsDataUrl(f)); } catch {}
    }
    setEditSlides(prev => [...prev, ...results]);
  };

  const doDelete = (id: string) => {
    setSongs(prev => prev.filter(s => s.id !== id));
    setFavorites(prev => prev.filter(f => f !== id));
    if (detail?.id === id) setDetail(null);
    setDelConfirm(null);
  };

  const doChangePw = () => {
    if (changePw.trim().length < 4) return;
    setAdminPw(changePw.trim()); setChangePw("");
    setPwOk(true); setTimeout(() => setPwOk(false), 3000);
  };

  const [importOk, setImportOk] = useState(false);
  const doImportPreset = () => {
    const existingTitles = new Set(songs.map(s => s.title));
    const allPresets = [...PRESET_SONGS, ...PRESET_SONGS_2];
    const seen = new Set<string>();
    const toAdd = allPresets
      .filter(p => {
        if (existingTitles.has(p.title) || seen.has(p.title)) return false;
        seen.add(p.title);
        return true;
      })
      .map((p, i) => ({
        id: `preset-${Date.now()}-${i}`,
        title: p.title, lyrics: p.lyrics,
        slides: [], pptName: null, pptData: null,
        dateAdded: Date.now() + i,
      }));
    setSongs(prev => [...prev, ...toAdd]);
    setImportOk(true); setTimeout(() => setImportOk(false), 3000);
  };

  // ── Computed ──────────────────────────────────────────────────
  const list = songs
    .filter(s => { const q = query.toLowerCase(); return s.title.toLowerCase().includes(q) || s.lyrics.toLowerCase().includes(q); })
    .sort((a, b) => {
      if (sort === "alpha")  return a.title.localeCompare(b.title, "ko");
      if (sort === "recent") return b.dateAdded - a.dateAdded;
      const af = favorites.includes(a.id) ? 1 : 0;
      const bf = favorites.includes(b.id) ? 1 : 0;
      return bf - af || a.title.localeCompare(b.title, "ko");
    });

  const ssSlides = detail ? (ssMode === "image" ? detail.slides : getTwoLineSlides(detail.lyrics)) : [];
  const doneCount = bulkItems.filter(it => it.status === "done").length;
  const errCount  = bulkItems.filter(it => it.status === "error").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Music className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden sm:block leading-none">
              <p className="font-bold text-[15px]" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>찬양 창고</p>
              <p className="text-[9px] text-muted-foreground tracking-widest uppercase mt-0.5">Praise Warehouse</p>
            </div>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input value={query} onChange={e => { setQuery(e.target.value); if (adminView) setAdminView(false); }}
              placeholder="제목이나 가사로 검색..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-muted/80 border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all" />
            {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="w-3.5 h-3.5" /></button>}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            {isAdmin ? (
              <>
                <button onClick={() => setAdminView(v => !v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${adminView ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
                  <Lock className="w-3.5 h-3.5" /> 관리자
                </button>
                <button onClick={doLogout} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors" title="로그아웃">
                  <LogOut className="w-4 h-4 text-muted-foreground" />
                </button>
              </>
            ) : (
              <button onClick={() => setShowLogin(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground/40 hover:text-muted-foreground" title="관리자">
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {adminView && isAdmin ? (
          /* ── 관리자 패널 ────────────────────────────────── */
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">관리자 패널</h1>
                <p className="text-xs text-muted-foreground">찬양 추가·삭제 · 현재 {songs.length}곡 저장됨</p>
              </div>
            </div>

            {/* ─ Preset import ─ */}
            <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">찬양 40곡 한꺼번에 가져오기</p>
                <p className="text-xs text-muted-foreground mt-0.5">이미 있는 곡은 건너뜁니다</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {importOk && <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> 완료</span>}
                <button onClick={doImportPreset} disabled={false}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> 가져오기
                </button>
              </div>
            </div>

            {/* ─ Upload tabs ─ */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Tab bar */}
              <div className="flex border-b border-border">
                {(["bulk", "single"] as const).map(tab => (
                  <button key={tab} onClick={() => setUploadTab(tab)}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${uploadTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50"}`}>
                    {tab === "bulk" ? `📦 한꺼번에 업로드` : "✏️ 개별 추가"}
                  </button>
                ))}
              </div>

              {uploadTab === "bulk" ? (
                /* ── 대량 업로드 ─────────────────────────── */
                <div className="p-5 space-y-4">
                  {(
                    <>
                      {/* Drop zone */}
                      <label className={`group flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${bulkItems.length > 0 ? "border-primary/30 bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/30"}`}>
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Upload className="w-7 h-7 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-sm">PPT / PPTX 파일을 여기에 끌어다 놓거나 클릭하여 선택</p>
                          <p className="text-xs text-muted-foreground mt-1">제한 없이 선택 가능 · .ppt, .pptx</p>
                        </div>
                        <input type="file" accept=".ppt,.pptx" multiple className="hidden"
                          onChange={e => e.target.files && handleBulkSelect(e.target.files)} />
                      </label>

                      {/* File list */}
                      {bulkItems.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{bulkItems.length}개 파일 선택됨</p>
                            {!isUploading && !uploadDone && (
                              <button onClick={() => setBulkItems([])} className="text-xs text-muted-foreground hover:text-destructive transition-colors">전체 취소</button>
                            )}
                          </div>

                          <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
                            {bulkItems.map((item, i) => (
                              <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${item.status === "done" ? "border-green-400/30 bg-green-500/5" : item.status === "error" ? "border-destructive/30 bg-destructive/5" : item.status === "loading" ? "border-primary/30 bg-primary/5" : "border-border bg-muted/20"}`}>
                                {/* Status icon */}
                                <div className="shrink-0 w-5 flex items-center justify-center">
                                  {item.status === "done"    && <Check className="w-4 h-4 text-green-500" />}
                                  {item.status === "error"   && <AlertCircle className="w-4 h-4 text-destructive" />}
                                  {item.status === "loading" && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                                  {item.status === "pending" && <span className="w-4 h-4 rounded-full border-2 border-border" />}
                                </div>

                                {/* Title input */}
                                <input
                                  value={item.title}
                                  onChange={e => updateBulkTitle(i, e.target.value)}
                                  disabled={isUploading || item.status === "done"}
                                  className="flex-1 min-w-0 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground disabled:text-muted-foreground"
                                  placeholder="제목 (파일명 자동 입력)"
                                />

                                {/* Filename */}
                                <span className="text-[10px] text-muted-foreground truncate max-w-[120px] hidden sm:block">{item.file.name}</span>

                                {/* Remove */}
                                {!isUploading && item.status !== "done" && (
                                  <button onClick={() => removeBulkItem(i)} className="shrink-0 w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Progress bar when uploading */}
                          {isUploading && (
                            <div>
                              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-300"
                                  style={{ width: `${(doneCount + errCount) / bulkItems.length * 100}%` }} />
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{doneCount + errCount} / {bulkItems.length} 처리 중...</p>
                            </div>
                          )}

                          {uploadDone && (
                            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-green-500/10 border border-green-400/30">
                              <Check className="w-4 h-4 text-green-500" />
                              <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                                {doneCount}곡 추가 완료{errCount > 0 ? ` · ${errCount}개 오류` : ""}
                              </p>
                            </div>
                          )}

                          {!isUploading && !uploadDone && (
                            <>
                            <button onClick={startBulkUpload}
                              className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                              <Upload className="w-4 h-4" /> {bulkItems.length}곡 한꺼번에 업로드
                            </button>
                            <p className="text-[11px] text-muted-foreground text-center">업로드 후 가사는 저장된 찬양 목록에서 추가할 수 있습니다</p>
                          </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                /* ── 개별 추가 ──────────────────────────── */
                <div className="p-5 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">PPT 파일 (선택)</label>
                    <label className="flex items-center gap-2 px-3 py-3 rounded-xl border border-dashed border-border bg-muted/20 cursor-pointer hover:bg-muted/50 transition-colors text-xs text-muted-foreground">
                      <Upload className="w-4 h-4 shrink-0" />
                      <span className="truncate">{newPptName || "PPT/PPTX 파일 선택 (원본 다운로드용)"}</span>
                      <input type="file" accept=".ppt,.pptx" className="hidden"
                        onChange={e => e.target.files?.[0] && handleSinglePpt(e.target.files[0])} />
                    </label>
                    {newPptName && (
                      <p className="text-xs text-primary mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3" /> {newPptName}
                        <button onClick={() => { setNewPptName(null); setNewPptData(null); }} className="ml-1 text-muted-foreground hover:text-destructive"><X className="w-3 h-3" /></button>
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">제목 *</label>
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="찬양 제목"
                      className="w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">가사 (절은 빈 줄로 구분)</label>
                    <textarea value={newLyrics} onChange={e => setNewLyrics(e.target.value)}
                      placeholder={"1절 가사\n가사 계속\n\n2절 가사\n가사 계속"}
                      rows={6} className="w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 resize-none leading-relaxed transition-all" />
                  </div>
                  {addErr && <p className="text-xs text-destructive">{addErr}</p>}
                  {addOk  && <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> 추가되었습니다!</p>}
                  <button onClick={doAddSong} disabled={songs.length >= MAX_SONGS}
                    className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40 transition-opacity">
                    <Plus className="w-4 h-4" /> 찬양 추가
                  </button>
                </div>
              )}
            </div>

            {/* ─ Change PW ─ */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" /> 비밀번호 변경
              </h2>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type={showChPw ? "text" : "password"} value={changePw}
                    onChange={e => setChangePw(e.target.value)} onKeyDown={e => e.key === "Enter" && doChangePw()}
                    placeholder="새 비밀번호 (4자 이상)"
                    className="w-full px-3 py-2.5 pr-9 rounded-xl bg-muted/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all" />
                  <button onClick={() => setShowChPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showChPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button onClick={doChangePw} disabled={changePw.trim().length < 4}
                  className="px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity">변경</button>
              </div>
              {pwOk && <p className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> 변경 완료</p>}
            </div>

            {/* ─ Song list ─ */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Music className="w-4 h-4 text-primary" /> 저장된 찬양 {songs.length}곡
              </h2>
              {songs.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-6">아직 추가된 찬양이 없습니다.</p>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {songs.map(s => (
                    <div key={s.id} className="rounded-xl border border-border bg-muted/10 overflow-hidden">
                      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{s.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {s.pptName && <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">PPT</span>}
                            {s.slides.length > 0 && <span className="text-[10px] text-primary font-medium">슬라이드 {s.slides.length}장</span>}
                            {s.lyrics
                              ? <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">가사 {getTwoLineSlides(s.lyrics).length}화면</span>
                              : <span className="text-[10px] text-orange-500 font-medium">가사 없음</span>
                            }
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => editLyricsId === s.id ? setEditLyricsId(null) : startEditLyrics(s)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${editLyricsId === s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>
                            가사 {editLyricsId === s.id ? "닫기" : s.lyrics ? "수정" : "입력"}
                          </button>
                          {delConfirm === s.id ? (
                            <>
                              <button onClick={() => doDelete(s.id)} className="px-2 py-1 rounded-lg bg-destructive text-destructive-foreground text-[10px] font-semibold">삭제</button>
                              <button onClick={() => setDelConfirm(null)} className="px-2 py-1 rounded-lg bg-muted text-[10px]">취소</button>
                            </>
                          ) : (
                            <button onClick={() => setDelConfirm(s.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                      {editLyricsId === s.id && (
                        <div className="px-3 pb-3 border-t border-border bg-background space-y-3">
                          {/* 슬라이드 이미지 업로드 */}
                          <div className="pt-3">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">PPT 슬라이드 이미지 (PNG/JPG)</p>
                            <label className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-border bg-muted/20 cursor-pointer hover:bg-muted/50 transition-colors text-xs text-muted-foreground">
                              <Upload className="w-3.5 h-3.5 shrink-0" />
                              {editSlides.length > 0 ? `${editSlides.length}장 — 추가하려면 클릭` : "슬라이드 이미지 업로드 (여러 장 가능)"}
                              <input type="file" accept="image/*" multiple className="hidden"
                                onChange={e => e.target.files && addEditSlides(e.target.files)} />
                            </label>
                            {editSlides.length > 0 && (
                              <div className="mt-2 flex gap-1.5 flex-wrap">
                                {editSlides.map((src, i) => (
                                  <div key={i} className="relative w-14 h-9 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                    <button onClick={() => setEditSlides(p => p.filter((_, j) => j !== i))}
                                      className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* 가사 */}
                          <div>
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">가사 (검정 배경 2줄 슬라이드쇼용)</p>
                            <textarea
                              value={editLyricsTxt}
                              onChange={e => setEditLyricsTxt(e.target.value)}
                              placeholder={"1절 가사\n가사 계속\n\n2절 가사\n가사 계속"}
                              rows={6}
                              autoFocus
                              className="w-full px-3 py-2 rounded-xl bg-muted/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 resize-none leading-relaxed transition-all"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button onClick={saveEditLyrics}
                              className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity">
                              <Check className="w-3.5 h-3.5" /> 저장
                            </button>
                            <button onClick={() => setEditLyricsId(null)}
                              className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-xs font-semibold hover:bg-accent transition-colors">
                              취소
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        ) : (
          /* ── 공개 뷰 ─────────────────────────────────── */
          <>
            <div className="flex items-center justify-between mb-5 gap-2 flex-wrap">
              <div className="flex gap-1.5">
                {([
                  { mode: "alpha"     as SortMode, label: "가나다순",   icon: <SortAsc className="w-3.5 h-3.5" /> },
                  { mode: "recent"    as SortMode, label: "최근 등록순", icon: <Clock className="w-3.5 h-3.5" /> },
                  { mode: "favorites" as SortMode, label: "즐겨찾기",   icon: <Heart className="w-3.5 h-3.5" /> },
                ]).map(({ mode, label, icon }) => (
                  <button key={mode} onClick={() => setSort(mode)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sort === mode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
                    {icon}{label}
                  </button>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">총 {list.length}곡</span>
            </div>

            {list.length === 0 ? (
              <div className="flex flex-col items-center py-32 text-muted-foreground">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Music className="w-8 h-8 opacity-20" />
                </div>
                <p className="text-sm">{songs.length === 0 ? "아직 등록된 찬양이 없습니다" : "검색 결과가 없습니다"}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map(song => {
                  const fav = favorites.includes(song.id);
                  return (
                    <div key={song.id} className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3 hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm leading-snug flex-1 cursor-pointer hover:text-primary transition-colors line-clamp-2"
                          onClick={() => setDetail(song)}>
                          {song.title}
                        </h3>
                        <button onClick={e => toggleFav(song.id, e)} className="shrink-0">
                          <Heart className={`w-4 h-4 transition-all ${fav ? "fill-rose-500 text-rose-500" : "text-muted-foreground hover:text-rose-400"}`} />
                        </button>
                      </div>
                      {song.lyrics && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed -mt-1">
                          {song.lyrics.split("\n").find(l => l.trim()) ?? ""}
                        </p>
                      )}
                      <div className="flex gap-2 mt-auto pt-2 border-t border-border">
                        <button onClick={() => openSS(song, "text")} disabled={!song.lyrics}
                          title={song.lyrics ? "가사 슬라이드쇼" : "가사 없음 — 관리자에서 가사를 입력해주세요"}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity">
                          <Play className="w-3.5 h-3.5" /> 가사
                        </button>
                        {song.pptData && (
                          <button onClick={() => song.slides.length > 0 ? openSS(song, "image") : undefined}
                            disabled={song.slides.length === 0}
                            title={song.slides.length === 0 ? "관리자에서 슬라이드 이미지를 추가해주세요" : "PPT 슬라이드쇼"}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity">
                            <FileText className="w-3.5 h-3.5" /> PPT
                          </button>
                        )}
                        <button
                          onClick={() => song.pptData ? downloadOriginalPpt(song) : generatePptx(song)}
                          title={song.pptData ? "원본 PPT 다운로드" : "가사 PPT 생성"}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-semibold hover:bg-amber-500/25 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      {/* ─── Detail Modal ─────────────────────────────────── */}
      {detail && !ssOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setDetail(null)}>
          <div className="bg-background w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[88vh] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between px-5 pt-5 shrink-0">
              <h2 className="text-lg font-bold flex-1 pr-3" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{detail.title}</h2>
              <button onClick={() => setDetail(null)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            {detail.lyrics ? (
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {detail.lyrics.split(/\n\n+/).map((verse, i) => (
                  <div key={i} className="mb-5 pb-5 border-b border-border last:border-0 last:mb-0 last:pb-0">
                    <p className="text-sm leading-8 whitespace-pre-line">{verse}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm py-8">
                가사가 없습니다
              </div>
            )}
            <div className="px-5 py-4 border-t border-border flex gap-2 shrink-0 flex-wrap">
              {detail.lyrics && (
                <button onClick={() => openSS(detail, "text")}
                  className="flex-1 min-w-[110px] py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <Play className="w-4 h-4" /> 가사 슬라이드쇼
                </button>
              )}
              {detail.slides.length > 0 && (
                <button onClick={() => openSS(detail, "image")}
                  className="flex-1 min-w-[110px] py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <FileText className="w-4 h-4" /> PPT 슬라이드쇼
                </button>
              )}
              <button onClick={() => detail.pptData ? downloadOriginalPpt(detail) : generatePptx(detail)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors">
                <Download className="w-4 h-4" /> {detail.pptData ? "PPT 다운로드" : "PPT 생성"}
              </button>
              <button onClick={() => toggleFav(detail.id)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all ${favorites.includes(detail.id) ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20" : "border-border hover:border-rose-300"}`}>
                <Heart className={`w-5 h-5 ${favorites.includes(detail.id) ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Slideshow ─────────────────────────────────────── */}
      {ssOpen && detail && (
        <div className="fixed inset-0 z-[70] select-none" style={{ background: "#000" }}
          onMouseMove={showCtrls}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={e => {
            const w = (e.currentTarget as HTMLDivElement).clientWidth;
            const max = ssSlides.length - 1;
            if (e.clientX < w / 2) setSsIdx(i => Math.max(0, i - 1));
            else setSsIdx(i => Math.min(max, i + 1));
            showCtrls();
          }}>
          {ssMode === "image" ? (
            <img key={ssIdx} src={ssSlides[ssIdx]} alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", animation: "ssIn .15s ease" }} />
          ) : (
            <div key={ssIdx} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8vw", animation: "ssIn .15s ease" }}>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: "clamp(28px, 5.5vw, 90px)", fontWeight: 700, color: "#FFFFFF", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.8, letterSpacing: "0.02em", textShadow: "0 2px 40px rgba(0,0,0,0.9)" }}>
                {ssSlides[ssIdx]}
              </p>
            </div>
          )}
          <div style={{ transition: "opacity .4s", opacity: ctrlVis ? 1 : 0, pointerEvents: ctrlVis ? "auto" : "none" }}>
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3"
              style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.85),transparent)" }}
              onClick={e => e.stopPropagation()}>
              <p className="text-white font-semibold text-sm">{detail.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-xs tabular-nums bg-black/40 px-2 py-0.5 rounded-full">{ssIdx + 1} / {ssSlides.length}</span>
                {detail.slides.length > 0 && (
                  <button onClick={e => { e.stopPropagation(); setSsMode(m => m === "text" ? "image" : "text"); setSsIdx(0); }}
                    className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors">
                    {ssMode === "text" ? "PPT 보기" : "가사 보기"}
                  </button>
                )}
                <button onClick={e => { e.stopPropagation(); toggleFull(); }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors" title="전체화면 F">
                  {isFull ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={e => { e.stopPropagation(); closeSS(); }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button disabled={ssIdx === 0} onClick={e => { e.stopPropagation(); setSsIdx(i => Math.max(0, i - 1)); showCtrls(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white disabled:opacity-0 disabled:pointer-events-none transition-all">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button disabled={ssIdx === ssSlides.length - 1} onClick={e => { e.stopPropagation(); setSsIdx(i => Math.min(ssSlides.length - 1, i + 1)); showCtrls(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white disabled:opacity-0 disabled:pointer-events-none transition-all">
              <ChevronRight className="w-8 h-8" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4"
              style={{ background: "linear-gradient(to top,rgba(0,0,0,0.7),transparent)" }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-1.5">
                {ssSlides.length <= 20
                  ? ssSlides.map((_, i) => (
                      <button key={i} onClick={() => { setSsIdx(i); showCtrls(); }}
                        className={`rounded-full transition-all duration-200 ${i === ssIdx ? "w-7 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/25 hover:bg-white/60"}`} />
                    ))
                  : <span className="text-white/40 text-xs tabular-nums">{ssIdx + 1} / {ssSlides.length}</span>
                }
              </div>
              <button onClick={e => { e.stopPropagation(); detail.pptData ? downloadOriginalPpt(detail) : generatePptx(detail); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/80 hover:bg-amber-500 text-white text-xs font-semibold transition-colors">
                <Download className="w-3.5 h-3.5" /> PPT 다운로드
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Login Modal ───────────────────────────────────── */}
      {showLogin && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => { setShowLogin(false); setLoginPw(""); setLoginErr(false); }}>
          <div className="bg-background w-full max-w-sm rounded-2xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-3">
                <Lock className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="font-bold text-lg">관리자 로그인</h2>
            </div>
            <div className="relative mb-3">
              <input type={showLoginPw ? "text" : "password"} value={loginPw}
                onChange={e => { setLoginPw(e.target.value); setLoginErr(false); }}
                onKeyDown={e => e.key === "Enter" && doLogin()}
                placeholder="비밀번호" autoFocus
                className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${loginErr ? "border-destructive/60 focus:ring-destructive/20 bg-destructive/5" : "border-border bg-muted/60 focus:ring-primary/20"}`} />
              <button onClick={() => setShowLoginPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showLoginPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {loginErr && <p className="text-xs text-destructive mb-3 text-center">비밀번호가 올바르지 않습니다.</p>}
            <button onClick={doLogin} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              로그인
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ssIn { from { opacity: 0; } to { opacity: 1; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(91,33,182,0.2); border-radius: 4px; }
      `}</style>
    </div>
  );
}
