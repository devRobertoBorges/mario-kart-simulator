//CADASTRO DOS JOGADORES
const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};

const player2 = {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0
};

const player3= {
    nome: "Peach",
    velocidade: 3, 
    manobrabilidade: 4,
    poder: 2,
    pontos: 0
};

const player4 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
};

const player5 = {
    nome: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0
};

const player6 = {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0
};

//RESULTADO DO DADO
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

//RESULTADO DE JOGAR O DADO
async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

//FUNCAO PARA SORTEAR O BLOCO
async function getRandomBlock(){
    let random = Math.random();
    let result;
    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    
    return result;
}
//FUNÇÃO PARA INICIAR A CORRIDA
async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        //SORTEAR BLOCO
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //VARIAVEIS QUE DEFINEM O RESULTADO DO DADO   
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
        
        //TESTE DE HABILIDADE
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;
        
        //BLOCO DE RETA
        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.velocidade;
            totalTestSkill2 = diceResult2 + character2.velocidade;

            await logRollResult(character1.nome,"velocidade", diceResult1, character1.velocidade);
            await logRollResult(character2.nome,"velocidade", diceResult2, character2.velocidade);
        }

        //BLOCO DE CURVA
        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.manobrabilidade;
            totalTestSkill2 = diceResult2 + character2.manobrabilidade;

            await logRollResult(character1.nome,"manobrabilidade", diceResult1, character1.manobrabilidade);
            await logRollResult(character2.nome,"manobrabilidade", diceResult2, character2.manobrabilidade);
        }
        
        //BLOCO DE CONFRONTO
        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;
            
            console.log(`Teve confronto! 🥊 ${character1.nome} X ${character2.nome}`)
            
            await logRollResult(character1.nome,"poder", diceResult1, character1.poder);
            await logRollResult(character2.nome,"poder", diceResult2, character2.poder);
            
            if(powerResult1 > powerResult2 && character2.pontos > 0){
                character2.pontos --;
                console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 PONTO. 🐢`)
            }else if(character2.pontos <= 0 && powerResult1 > powerResult2){
                console.log(`${character2.nome} está péssimo na corrida! Foi acertado e não tem pontos a perder... 😳`)
            }

            if(powerResult2 > powerResult1 && character1.pontos > 0){
                character1.pontos --;
                console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 PONTO. 🐢`);
            }else if(character1.pontos <= 0 && powerResult2 > powerResult1){
                console.log(`${character1.nome} está péssimo na corrida! Foi acertado e não tem pontos a perder... 😳`)
            }

            if (powerResult1 === powerResult2) {
             console.log('Confronto empatado! Nenhum ponto foi perdido');
            }
        }
        
        //CONFERENCIA DE MARCAÇÃO DE PONTOS
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`🚨🏁 ${character1.nome} marcou um ponto!`)
            character1.pontos++;

        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`🚨🏁 ${character2.nome} marcou um ponto!`)
            character2.pontos++;
        }    

        console.log('----------------------------------')
    }
}

//FUNCAO PARA DECLARAR O GANHADOR
async function declareWinner(character1, character2) {
    console.log('Resultado final: ');
    console.log(`${character1.nome}: ${character1.pontos} PONTO(s)`);
    console.log(`${character2.nome}: ${character2.pontos} PONTO(s)`);
    
    if(character1.pontos > character2.pontos)
        console.log(`\n${character1.nome} venceu a corrida! Parabéns! 🏆`)
    else if(character2.pontos > character1.pontos)
        console.log(`\n${character2.nome} venceu a corrida! Parabéns! 🏆`)
    else
        console.log(`Corrida empatada! Não houve ganhadores. ❌`)
}

//FUNCAO CONTROLADORA
(async function main(){
    console.log(`🚨🏁 Corrida entre ${player5.nome} e ${player6.nome} começando...\n`);
    
    await playRaceEngine(player5, player6);

    await declareWinner(player5, player6);
})();

