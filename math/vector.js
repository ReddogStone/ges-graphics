function vec(x, y) {
	return { x: x, y: y };
}

function vclone(v) {
	return vec(v.x, v.y);
}

function vadd(v1, v2) {
	return vec(v1.x + v2.x, v1.y + v2.y);
}
function vsub(v1, v2) {
	return vec(v1.x - v2.x, v1.y - v2.y);
}

function vneg(v) {
	return vec(-v.x, -v.y);
}
function vscale(v, s) {
	return vec(v.x * s, v.y * s);
}

function vmul(v1, v2) {
	return vec(v1.x * v2.x, v1.y * v2.y);
}

function vdiv(v1, v2) {
	return vec(v1.x / v2.x, v1.y / v2.y);
}

function vsqlen(v) {
	return v.x * v.x + v.y * v.y;
}

function vlen(v) {
	return Math.sqrt(vsqlen(v));
}

function vnorm(v) {
	var l = vlen(v);
	if (l < 0.00001) {
		return vec(0, 0);
	}
	return vscale(v, 1.0 / l);
}

function vdir(from, to) {
	return vnorm(vsub(to, from));
}

function vlerp(v1, v2, a) {
	return vadd(vscale(v1, 1 - a), vscale(v2, a));
}

function veq(v1, v2) {
	return v1.x === v2.x && v1.y === v2.y;
}

function vdot(v1, v2) {
	return v1.x * v2.x + v1.y * v2.y;
}

function vdist(v1, v2) {
	return vlen(vsub(v2, v1));
}

function vmap(v, func) {
	return vec(func(v.x), func(v.y));
}

function vflip(v) {
	return vec(v.y, v.x);
}

function vrot(v, angle) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	return vec(v.x * c - v.y * s, v.x * s + v.y * c);
}
