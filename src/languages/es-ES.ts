import { codeBlock, toTitleCase } from '@klasa/utils';
import { LanguageHelp } from '../utils/LanguageHelp';
import friendlyDuration from '../utils/FriendlyDuration';
import { Language, version as klasaVersion, LanguageStore } from 'klasa';

export const enum Emojis {
	GreenTick = '<:greenTick:637706251253317669>',
	Loading = '<a:sloading:656988867403972629>',
	RedCross = '<:redCross:637706251257511973>',
	Shiny = '<:shiny:612364146792726539>'
}

const LOADING = Emojis.Loading;
const GREENTICK = Emojis.GreenTick;
const REDCROSS = Emojis.RedCross;

const builder = new LanguageHelp()
	.setExplainedUsage('⚙ | ***Uso Explicado***')
	.setPossibleFormats('🔢 | ***Formatos Posibles***')
	.setExamples('🔗 | ***Ejemplos***')
	.setReminder('⏰ | ***Recordatorio***');

const PERMS = {
	ADMINISTRATOR: 'Administrador',
	VIEW_AUDIT_LOG: 'Ver el registro de auditoría',
	MANAGE_GUILD: 'Administrar el Servidor',
	MANAGE_ROLES: 'Administrar Roles',
	MANAGE_CHANNELS: 'Administrar Canales',
	KICK_MEMBERS: 'Expulsar Miembros',
	BAN_MEMBERS: 'Banear Miembros',
	CREATE_INSTANT_INVITE: 'Crear Invitación Instantánea',
	CHANGE_NICKNAME: 'Cambiar apodo',
	MANAGE_NICKNAMES: 'Administrar apodos',
	MANAGE_EMOJIS: 'Administrar emojis',
	MANAGE_WEBHOOKS: 'Administrar Webhooks',
	VIEW_CHANNEL: 'Leer Mensajes',
	SEND_MESSAGES: 'Enviar Mensajes',
	SEND_TTS_MESSAGES: 'Enviar Mensajes de TTS',
	MANAGE_MESSAGES: 'Administrar Mensajes',
	EMBED_LINKS: 'Insertar Enlaces',
	ATTACH_FILES: 'Adjuntar Archivos',
	READ_MESSAGE_HISTORY: 'Leer el historial de mensajes',
	MENTION_EVERYONE: 'Mencionar a todos',
	USE_EXTERNAL_EMOJIS: 'Usar Emojis externos',
	ADD_REACTIONS: 'Añadir reacciones',
	CONNECT: 'Conectar',
	SPEAK: 'Hablar',
	STREAM: 'Conectar en Vivo',
	MUTE_MEMBERS: 'Silenciar Miembros',
	DEAFEN_MEMBERS: 'Ensordecer Miembros',
	MOVE_MEMBERS: 'Mover Miembros',
	USE_VAD: 'Usar la actividad de voz',
	PRIORITY_SPEAKER: 'Orador Prioritario'
};

const TIMES = {
	YEAR: {
		1: 'año',
		DEFAULT: 'años'
	},
	MONTH: {
		1: 'mes',
		DEFAULT: 'meses'
	},
	WEEK: {
		1: 'semana',
		DEFAULT: 'semanas'
	},
	DAY: {
		1: 'día',
		DEFAULT: 'días'
	},
	HOUR: {
		1: 'hora',
		DEFAULT: 'horas'
	},
	MINUTE: {
		1: 'minuto',
		DEFAULT: 'minutos'
	},
	SECOND: {
		1: 'segundo',
		DEFAULT: 'segundos'
	}
};

function duration(time: number, precision?: number) {
	return friendlyDuration(time, TIMES, precision);
}

export default class extends Language {

	public constructor(store: LanguageStore, file: string[], dir: string) {
		super(store, file, dir);
		this.language = {
			DEFAULT: key => `La clave ${key} aún no ha sido traducida a es-ES.`,
			DEFAULT_LANGUAGE: 'Lenguaje Predeterminado',
			PREFIX_REMINDER: prefix => `El prefijo de este servidor está configurado a: \`${prefix}\``,
			SETTING_GATEWAY_KEY_NOEXT: key => `The key "${key}" does not exist in the data schema.`,
			SETTING_GATEWAY_CHOOSE_KEY: keys => `You cannot edit a settings group, pick any of the following: "${keys.join('", "')}"`,
			SETTING_GATEWAY_UNCONFIGURABLE_FOLDER: 'This settings group does not have any configurable sub-key.',
			SETTING_GATEWAY_UNCONFIGURABLE_KEY: key => `The settings key "${key}" has been marked as non-configurable by the bot owner.`,
			SETTING_GATEWAY_MISSING_VALUE: (entry, value) => `The value "${value}" cannot be removed from the key "${entry.path}" because it does not exist.`,
			SETTING_GATEWAY_DUPLICATE_VALUE: (entry, value) => `The value "${value}" cannot be added to the key "${entry.path}" because it was already set.`,
			SETTING_GATEWAY_INVALID_FILTERED_VALUE: (entry, value) => `The settings key "${entry.path}" does not accept the value "${value}".`,
			RESOLVER_MULTI_TOO_FEW: (name, min = 1) => `No pude resolver suficientes ${name}s. Al menos ${min} ${min === 1 ? 'es' : 'son'} requeridos.`,
			RESOLVER_INVALID_BOOL: name => `${name} debe ser o 'true' para afirmativo, o 'false' para negativo.`,
			RESOLVER_INVALID_CHANNEL: name => `${name} debe ser una mención de canal o una id de canal válida.`,
			RESOLVER_INVALID_CUSTOM: (name, type) => `${name} debe ser un válido ${type}.`,
			RESOLVER_INVALID_DATE: name => `${name} debe ser una fecha válida.`,
			RESOLVER_INVALID_DURATION: name => `${name} debe ser una duración válida.`,
			RESOLVER_INVALID_EMOJI: name => `${name} debe ser un emoji o una id de emoji válida.`,
			RESOLVER_INVALID_FLOAT: name => `${name} debe ser un número válido.`,
			RESOLVER_INVALID_GUILD: name => `${name} debe ser una id de servidor válida.`,
			RESOLVER_INVALID_INT: name => `${name} debe ser un número entero válido.`,
			RESOLVER_INVALID_LITERAL: name => `La opción no coincide con la única posibilidad: ${name}`,
			RESOLVER_INVALID_MEMBER: name => `${name} debe ser una mención de usuario o una id de usuario válida.`,
			RESOLVER_INVALID_MESSAGE: name => `${name} debe ser una id de mensaje válida.`,
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} debe ser un nombre de ${piece} válido.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} debe combinar con el siguiente patrón \`${pattern}\`.`,
			RESOLVER_INVALID_ROLE: name => `${name} debe ser una mención de rol o una id de rol válida.`,
			RESOLVER_INVALID_STRING: name => `${name} debe ser un texto no vacío válido.`,
			RESOLVER_INVALID_TIME: name => `${name} debe ser una duración o fecha válida.`,
			RESOLVER_INVALID_URL: name => `${name} debe ser un enlace válido.`,
			RESOLVER_INVALID_USER: name => `${name} debe ser una mención o una id de usuario válida.`,
			RESOLVER_STRING_SUFFIX: ' carácteres',
			RESOLVER_MINMAX_EXACTLY: (name, min) => `${name} must be exactly ${min}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, inclusive) => inclusive ? `${name} must be between ${min} and ${max} inclusively.` : `${name} must be between ${min} and ${max} exclusively.`,
			RESOLVER_MINMAX_MIN: (name, min, inclusive) => inclusive ? `${name} must be greater than ${min} inclusively.` : `${name} must be greater than ${min} exclusively.`,
			RESOLVER_MINMAX_MAX: (name, max, inclusive) => inclusive ? `${name} must be less than ${max} inclusively` : `${name} must be less than ${max} exclusively.`,
			REACTIONHANDLER_PROMPT: '¿A qué página te gustaría saltar?',
			COMMANDMESSAGE_MISSING: 'Faltan uno o más argumentos al final de la entrada.',
			COMMANDMESSAGE_MISSING_REQUIRED: name => `El argumento ${name} es requerido.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: possibles => `Falta una opción requerida: (${possibles})`,
			COMMANDMESSAGE_NOMATCH: possibles => `Su opción no se pudo encontrar en ninguna de las posibilidades: (${possibles})`,
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time, abortOptions) => `${tag} | **${error}** | Tienes **${time}** segundos para responder a este mensaje con un argumento válido. Escribe **${abortOptions.join('**, **')}** para cancelar la solicitud.`,
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time, cancelOptions) => `${tag} | El argumento **${name}** puede aceptar multiples valores | Tienes **${time}** segundos para responder a esta solicitud con valores adicionales. Escribe **${cancelOptions.join('**, **')}** para cancelar la solicitud.`,
			MONITOR_COMMAND_HANDLER_ABORTED: 'Cancelado.',
			INHIBITOR_COOLDOWN: remaining => `Acabas de usar este comando. Puedes usarlo de nuevo en ${duration(remaining)}.`,
			INHIBITOR_DISABLED_GUILD: 'This command has been disabled by an admin in this guild!.',
			INHIBITOR_DISABLED_GLOBAL: 'This command has been globally disabled by the bot owner.',
			INHIBITOR_MISSING_BOT_PERMS: missing => `No tengo los permisos suficientes, me faltan: **${missing}**`,
			INHIBITOR_NSFW: 'Este comando no es apto para este canal, no es un canal marcado como "NSFW"',
			INHIBITOR_PERMISSIONS: 'No tienes permisos para usar este comando',
			INHIBITOR_REQUIRED_SETTINGS: settings => `El servidor requiere ${settings.length === 1 ? 'el ajuste' : 'los ajustes'} del servidor **${settings.join(', ')}**, y por lo tanto, no puedo ejecutar el comando.`,
			INHIBITOR_RUNIN: types => `Éste comando sólo está disponible en los canales de ${types}`,
			INHIBITOR_RUNIN_NONE: name => `El comando ${name} no está configurado para ejecutarse en algún canal.`,
			COMMAND_BLACKLIST_DESCRIPTION: 'Pone o quita usuarios and servidores de mi lista negra.',
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
				usersAdded.length ? `**Usuarios Añadidos**\n${codeBlock('', usersAdded.join(', '))}` : '',
				usersRemoved.length ? `**Usuarios Eliminados**\n${codeBlock('', usersRemoved.join(', '))}` : '',
				guildsAdded.length ? `**Servidores Añadidos**\n${codeBlock('', guildsAdded.join(', '))}` : '',
				guildsRemoved.length ? `**Servidores Eliminados**\n${codeBlock('', guildsRemoved.join(', '))}` : ''
			].filter(val => val !== '').join('\n'),
			COMMAND_EVAL_DESCRIPTION: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
			COMMAND_EVAL_EXTENDED: builder.display('eval', {
				extendedHelp: `The eval command evaluates code as-in, any error thrown from it will be handled.
						It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.
						The --wait flag changes the time the eval will run. Defaults to 10 seconds. Accepts time in milliseconds.
						The --output and --output-to flag accept either 'file', 'log', 'haste' or 'hastebin'.
						The --delete flag makes the command delete the message that executed the message after evaluation.
						The --silent flag will make it output nothing.
						The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.
						The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword
						The --showHidden flag will enable the showHidden option in util.inspect.
						The --lang and --language flags allow different syntax highlight for the output.
						The --json flag converts the output to json
						The --no-timeout flag disables the timeout
						If the output is too large, it'll send the output as a file, or in the console if the bot does not have the ${PERMS.ATTACH_FILES} permission.`,
				examples: [
					'msg.author!.username;',
					'1 + 1;'
				]
			}, true),
			COMMAND_EVAL_ERROR: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT_CONSOLE: (time, type) => `Sent the result to console.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT_FILE: (time, type) => `Sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT_HASTEBIN: (time, url, type) => `Sent the result to hastebin: ${url}\n**Type**:${type}\n${time}\n`,
			COMMAND_UNLOAD: (type, name) => `${GREENTICK} Eliminado con éxito la pieza tipo ${type}: ${name}`,
			COMMAND_UNLOAD_DESCRIPTION: 'Elimina una pieza de Klasa.',
			COMMAND_TRANSFER_ERROR: `${REDCROSS} El archivo ya había sido transferido o nunca existió.`,
			COMMAND_TRANSFER_SUCCESS: (type, name) => `${GREENTICK} Transferido con éxito la pieza tipo ${type}: ${name}`,
			COMMAND_TRANSFER_FAILED: (type, name) => `La transferencia de la pieza tipo ${type}: ${name} al cliente falló. Por favor revisa la consola.`,
			COMMAND_TRANSFER_DESCRIPTION: 'Transfiere una pieza interna a su carpeta respectiva.',
			COMMAND_RELOAD: (type, name, time) => `${GREENTICK} Recargada la pieza tipo ${type}: ${name}. (Tomó: ${time})`,
			COMMAND_RELOAD_ALL: (type, time) => `${GREENTICK} Recargadas todas las piezas tipo ${type}. (Tomó: ${time})`,
			COMMAND_RELOAD_EVERYTHING: time => `${GREENTICK} Recargado todo. (Tomó: ${time})`,
			COMMAND_RELOAD_DESCRIPTION: 'Recarga una pieza de Klasa, o todas las piezas de su lista.',
			COMMAND_REBOOT: `${LOADING} Reiniciando...`,
			COMMAND_REBOOT_DESCRIPTION: 'Reinicia el bot.',
			COMMAND_LOAD: (time, type, name) => `${GREENTICK} Successfully loaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_LOAD_FAIL: 'The file does not exist, or an error occurred while loading your file. Please check your console.',
			COMMAND_LOAD_ERROR: (type, name, error) => `${REDCROSS} Failed to load ${type}: ${name}. Reason:${codeBlock('js', error)}`,
			COMMAND_LOAD_DESCRIPTION: 'Load a piece from your bot.',
			COMMAND_PING: `${LOADING} Ping?`,
			COMMAND_PING_DESCRIPTION: 'Establece una prueba de conexión con Discord.',
			COMMAND_PINGPONG: (diff, ping) => `Pong! (El viaje ida y vuelta tomó: ${diff}ms. Pulso: ${ping}ms.)`,
			COMMAND_INVITE: () => [
				`Para añadir Wumpus a tu servidor: <${this.client.invite}>`,
				'No tengas miedo de quitar algunos permisos, Skyra te hará saber si estás intentando ejecutar un comando sin los permisos requeridos.'
			].join('\n'),
			COMMAND_INVITE_DESCRIPTION: 'Muestra el enlace para invitarme.',
			COMMAND_INVITEMODE_DESCRIPTION: 'Manage the behaviour for the invite link filter.',
			COMMAND_INVITEMODE_EXTENDED: builder.display('inviteMode', {
				extendedHelp: `The inviteMode command manages the behaviour of the word filter system.`,
				explainedUsage: [
					['Enable', 'Enable the sub-system.'],
					['Disable', 'Disable the sub-system'],
					['Action Alert', 'Toggle message alerts in the channel.'],
					['Action Log', 'Toggle message logs in the moderation logs channel.'],
					['Action Delete', 'Toggle message deletions.'],
					['Punishment', 'The moderation action to take, takes any of `none`, `warn`, `kick`, `mute`, `softban`, or `ban`.'],
					['Punishment-Duration', 'The duration for the punishment, only applicable to `mute` and `ban`. Takes a duration.'],
					['Threshold-Maximum', 'The amount of infractions that can be done within `Threshold-Duration` before taking action, instantly if unset. Takes a number.'],
					['Threshold-Duration', 'The time in which infractions will accumulate before taking action, instantly if unset. Takes a duration.']
				],
				reminder: '`Action Log` requires `channel.moderation-logs` to be set up.',
				examples: [
					'enable',
					'disable',
					'action alert',
					'punishment ban',
					'punishment mute',
					'punishment-duration 1m',
					'threshold-maximum 5',
					'threshold-duration 30s'
				]
			}),
			COMMAND_INFO: [
				`Wumpus is a multi-purpose Discord Bot designed to run the majority of tasks with a great performance and constant 24/7 uptime.`,
				"It's built on top of Klasa, a 'plug-and-play' framework built on top of the Discord.js library."
			].join('\n'),
			COMMAND_INFO_DESCRIPTION: 'Muestra alguna información sobre mí.',
			COMMAND_HELP_DESCRIPTION: 'Muestra la ayuda para un comando o todos.',
			COMMAND_HELP_NO_EXTENDED: 'No está documentado completamente.',
			COMMAND_HELP_DM: '📥 | La lista de comandos ha sido enviada a tus mensajes privados.',
			COMMAND_HELP_NODM: `${REDCROSS} | Parece que tienes tus mensajes privados desactivados, no pude mandarte el mensaje.`,
			COMMAND_HELP_ALL_FLAG: prefix => `Mostrando una categoría por página. ¿Problemas con el mensaje? Envía \`${prefix}help --all\` para la lista de todos los comandos en tus Mensajes Directos.`,
			COMMAND_HELP_COMMAND_COUNT: n => `${n} comando${n === 1 ? '' : 's'}`,
			COMMAND_ENABLE: (type, name) => `+ Activado con éxito la pieza tipo ${type}: ${name}`,
			COMMAND_ENABLE_DESCRIPTION: 'Re-activa o activa temporalmente una pieza de Klasa. El estado por defecto es restaurado al recargar.',
			COMMAND_DISABLE: (type, name) => `+ Desactivado con éxito la pieza tipo ${type}: ${name}`,
			COMMAND_DISABLE_DESCRIPTION: 'Re-desactiva o desactiva temporalmente una pieza de Klasa. El estado por defecto es restaurado al recargar.',
			COMMAND_DISABLE_WARN: 'Probablemente no quieras desactivar eso, ya que no tendrías ningún comando para re-activarlo.',
			COMMAND_CONF_NOKEY: 'Debes proveer el nombre de una clave.',
			COMMAND_CONF_NOVALUE: 'Debes proveer un valor para la clave.',
			COMMAND_CONF_GUARDED: name => `La pieza ${toTitleCase(name)} no debería ser desactivada.`,
			COMMAND_CONF_UPDATED: (key, response) => `Actualizado con éxito la clave **${key}** al valor: \`${response}\`.`,
			COMMAND_CONF_KEY_NOT_ARRAY: 'Esta clave no acepta múltiples valores. Usa la acción \'reset\' en su lugar.',
			COMMAND_CONF_GET_NOEXT: key => `The key **${key}** does not seem to exist.`,
			COMMAND_CONF_GET: (key, value) => `The value for the key **${key}** is: \`${value}\``,
			COMMAND_CONF_RESET: (key, response) => `The key **${key}** has been reset to: \`${response}\``,
			COMMAND_CONF_NOCHANGE: key => `The value for **${key}** was already that value.`,
			COMMAND_CONF_SERVER_DESCRIPTION: 'Define per-server settings.',
			COMMAND_CONF_SERVER: (key, list) => `**Server Setting ${key}**\n${list}`,
			COMMAND_CONF_USER_DESCRIPTION: 'Define per-user settings.',
			COMMAND_CONF_USER: (key, list) => `**User Setting ${key}**\n${list}`,
			COMMAND_STATS: (usage, uptime, users, guilds, channels, klasa_version, version, node_js) => [
				'Statistics',
				`• **Users**: ${users}`,
				`• **Guilds**: ${guilds}`,
				`• **Channels**: ${channels}`,
				`• **Discord.js**: ${version}`,
				`• **Node.js**: ${node_js}`,
				`• **Klasa**: ${klasaVersion}`,
				`• **Uptime**: ${duration(uptime, 2)}`,
				`• **Usage**: ${usage}`
			],
			COMMAND_STATS_DESCRIPTION: 'Provides some details about the bot and stats.',
			MESSAGE_PROMPT_TIMEOUT: 'La solicitud no recibió ninguna respuesta a tiempo.',
			TEXT_PROMPT_ABORT_OPTIONS: ['abortar', 'parar', 'cancelar'],
			COMMAND_HELP_USAGE: usage => `Uso :: ${usage}`,
			COMMAND_HELP_EXTENDED: 'Información Detallada ::',

			COMMAND_CLASE_DESCRIPTION: 'Establece la clase para tu perfil.',
			COMMAND_CLASE_EXTENDED: '¡Magos y caballeros! ¡Tienes dos bandos a elegir! ¿Cuál eligirás?',
			COMMAND_CLASE_CHOSEN: '¡Ya perteneces a un bando!',
			COMMAND_PERFIL_NO_CLASS: '> <:alerta:482251195709128726> Para poder acceder a todas las funciones, debes elegir primero una clase. Para ello escribe el comando ``+clase <mago/caballero>``.'
		};
	}

	public async init() {
		await super.init();
	}

}
