(function (win) {
	var decode = decodeURIComponent;
	var encode = encodeURIComponent;

// Helpers
	function isString(o) {
		return typeof o === 'string';
	}

	function isNonEmptyString(s) {
		return isString(s) && s !== '';
	}

	function validateCookieName(name) {
		if (!isNonEmptyString(name)) {
			throw new TypeError('Cookie name must be a non-empty string');
		}
	}

	function same(s) {
		return s;
	}

	function parseCookieString(text, shouldDecode) {
		var cookies = {};

		if (isString(text) && text.length > 0) {

			var decodeValue = shouldDecode ? decode : same;
			var cookieParts = text.split(/;\s/g);
			var cookieName;
			var cookieValue;
			var cookieNameValue;

			for (var i = 0, len = cookieParts.length; i < len; i++) {

				// Check for normally-formatted cookie (name-value)
				cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
				if (cookieNameValue instanceof Array) {
					try {
						cookieName = decode(cookieNameValue[1]);
						cookieValue = decodeValue(cookieParts[i]
							.substring(cookieNameValue[1].length + 1));
					} catch (ex) {
						// Intentionally ignore the cookie -
						// the encoding is wrong
					}
				} else {
					// Means the cookie does not have an "=", so treat it as
					// a boolean flag
					cookieName = decode(cookieParts[i]);
					cookieValue = '';
				}

				if (cookieName) {
					cookies[cookieName] = cookieValue;
				}
			}

		}

		return cookies;
	}

	var Cookie = {
		/**
		 * 杩斿洖鎸囧畾name鐨刢ookie
		 * @param {String} name 瑕佹绱ookie鐨勫悕绉�
		 * @param {Function|Object} [options] 涓€涓璞″寘鍚竴涓垨澶氫釜cookie閫夐」锛�
		 *  1.褰搊ptions鏄嚱鏁版椂锛岃浆鎹㈠嚱鏁拌繑鍥炲€笺€�
		 *  2.褰搊ptions鏄璞★紝raw琚缃负true鏃�,cookie鍊间笉鏄疷RI瑙ｇ爜銆�
		 * @returns {*}
		 */
		get: function (name, options) {
			validateCookieName(name);

			if (typeof options === 'function') {
				options = {converter: options};
			}
			else {
				options = options || {};
			}

			var cookies = parseCookieString(document.cookie, !options['raw']);
			return (options.converter || same)(cookies[name]);
		},
		/**
		 * 鏍规嵁缁欏畾鐨勫悕绉板拰鍊艰缃竴涓猚ookie
		 * @param {string} name cookie鐨勫悕绉�
		 * @param {*} value 璁剧疆cookie鐨勫€�
		 * @param {Object} [options] 鍖呭惈cookie閫夐」鐨勫璞★細
		 *  path (a string) 榛樿鏍圭洰褰�
		 *  domain (a string) 榛樿褰撳墠鍩熷悕鐨刣omain
		 *  expires (number or a Date object) 榛樿30澶�
		 *  secure (true/false) 褰撳睘鎬ц缃负true鏃讹紝cookie鍙湁鍦╤ttps鍗忚涓嬫墠鑳戒笂浼犲埌鏈嶅姟鍣ㄣ€�
		 *  raw (true/false). 濡傛灉璁剧疆涓簍rue,cookie涓嶅簲璇ュ湪璁剧疆涔嬪墠URI缂栫爜銆�
		 * @returns {string} 鍒涘缓鐨刢ookie瀛楃涓�
		 */
		set: function (name, value, options) {
			validateCookieName(name);

			options = options || {};
			var expires = options['expires'];
			if (typeof expires === 'undefined') {
				// 榛樿30澶╂湁鏁堟湡
				expires = 30;
			}
			var domain = options['domain'] || document.domain;
			var path = options['path'] || '/';

			if (!options['raw']) {
				value = encode(String(value));
			}

			var text = name + '=' + value;

			// expires
			var date = expires;
			if (typeof date === 'number') {
				date = new Date();
				date.setDate(date.getDate() + expires);
			}
			if (date instanceof Date) {
				text += '; expires=' + date.toUTCString();
			}

			// domain
			if (isNonEmptyString(domain)) {
				text += '; domain=' + domain;
			}

			// path
			if (isNonEmptyString(path)) {
				text += '; path=' + path;
			}

			// secure
			if (options['secure']) {
				text += '; secure';
			}

			document.cookie = text;
			return text;
		},
		/**
		 * 閫氳繃灏哻ookie鏈夋晥鏈熻缃垚涓€涓繃鍘荤殑鏃堕棿鏉ョЩ闄ookie
		 * @param {string} name 灏嗚绉婚櫎鐨刢ookie鍚�
		 * @param options cookie閰嶇疆椤癸紝鍙傝€僺et鏂规硶
		 * @returns {string} 鍒涘缓鐨刢ookie瀛楃涓�
		 */
		remove: function (name, options) {
			options = options || {};
			options['expires'] = new Date(0);
			return this.set(name, '', options);
		}
	};

	win.Cookie = Cookie;
})(window);