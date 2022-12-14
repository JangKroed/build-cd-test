"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
const config_1 = __importDefault(require("../../db/redis/config"));
exports.default = {
    // help: (CMD: string | undefined, user: UserSession) => {}
    fhelp: (CMD, user) => {
        let tempScript = '';
        tempScript += '명령어 : \n';
        tempScript += '[공격] 하기 - 전투를 진행합니다.\n';
        tempScript += '[도망] 가기 - 전투를 포기하고 도망갑니다.\n';
        tempScript += '---전투 중 명령어---\n';
        tempScript += '[스킬1] 사용 - 1번 슬롯에 장착된 스킬을 사용합니다.\n';
        tempScript += '[스킬2] 사용 - 2번 슬롯에 장착된 스킬을 사용합니다.\n';
        tempScript += '[스킬3] 사용 - 3번 슬롯에 장착된 스킬을 사용합니다.\n';
        tempScript += '[스킬4] 사용 - 4번 슬롯에 장착된 스킬을 사용합니다.\n';
        const script = tempScript;
        const field = 'encounter';
        return { script, user, field };
    },
    fight: (CMD, user) => __awaiter(void 0, void 0, void 0, function* () {
        const dungeonSession = yield config_1.default.hGetAll(String(user.characterId));
        let tempScript = '';
        const tempLine = '========================================\n';
        tempScript += `당신은 도망쳤습니다. \n\n`;
        tempScript += `??? : 하남자특. 도망감.\n`;
        // 몬스터 삭제
        services_1.MonsterService.destroyMonster(+dungeonSession.monsterId, user.characterId);
        const script = tempLine + tempScript;
        const field = 'dungeon';
        return { script, user, field };
    }),
    fwrongCommand: (CMD, user) => {
        let tempScript = '';
        tempScript += `입력값을 확인해주세요.\n`;
        tempScript += `현재 입력 : '${CMD}'\n`;
        tempScript += `사용가능한 명령어가 궁금하시다면 '도움말'을 입력해보세요.\n`;
        const script = 'Error : \n' + tempScript;
        const field = 'encounter';
        return { script, user, field };
    },
};
