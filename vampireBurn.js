let duelStartTime = 0
let player_score = 0
let maxDuelTime = 0
let exsposure = 0
let duelIsOn = false
let enemys_health = 0
let game_is_running = false
function you_lose()  {
    game_is_running = false
    basic.showLeds(`
        . # . # .
        . . . . .
        # # # # #
        # # . # #
        . # . # .
        `)
    basic.pause(500)
    basic.showLeds(`
        . # . # .
        # . . . #
        # # # # #
        . # . # .
        . . . . .
        `)
    music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once)
}
function you_win()  {
    game_is_running = false
    basic.showLeds(`
        # # # # #
        # # . # #
        . # # # .
        . . # . .
        . # # # .
        `)
    music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
}
input.onButtonPressed(Button.A, () => {
    if (duelIsOn) {
        enemys_health += -1
        if (enemys_health <= 0) {
            duelIsOn = false
            music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
            basic.showLeds(`
                # . # . #
                . # # # .
                # # # # #
                . # # # .
                # . # . #
                `)
            basic.pause(500)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            player_score += 1
            if (player_score == 3) {
                you_win()
            }
        }
    }
})
game_is_running = true
duelIsOn = false
maxDuelTime = 4000
player_score = 0
basic.forever(() => {
    if (game_is_running) {
        if (duelIsOn != true) {
            exsposure = input.lightLevel()
            if (exsposure < 30) {
                duelIsOn = true
                duelStartTime = input.runningTime()
                basic.showLeds(`
                    . # . # .
                    . . . . .
                    # # # # #
                    # # . # #
                    . # . # .
                    `)
                enemys_health = Math.random(3) + 5 + player_score
            }
        } else {
            if (duelIsOn) {
                if (input.runningTime() - duelStartTime > maxDuelTime) {
                    you_lose()
                }
            }
        }
    }
})
